/**
 * OVI Knowledge Engine — Rules Module
 * FASE 2 · Foundation Order 002
 *
 * Exports the rule engine and product rule evaluator.
 */

export { productRules, getProductRule, getRuleProductIds } from "./product-rules";

export type { OviProductRule, OviRuleCondition, OviRuleEvaluationResult } from "../types";

/**
 * Evaluates a single rule condition against a given decision input value.
 *
 * @param condition  The rule condition to evaluate
 * @param fieldValue The current value of the field being tested
 */
export function evaluateCondition(
  condition: import("../types").OviRuleCondition,
  fieldValue: unknown,
): boolean {
  const { operator, value } = condition;

  switch (operator) {
    case "exists":
      return fieldValue !== undefined && fieldValue !== null;

    case "notExists":
      return fieldValue === undefined || fieldValue === null;

    case "equals":
      return fieldValue === value;

    case "notEquals":
      return fieldValue !== value;

    case "includes":
      if (Array.isArray(fieldValue)) {
        return Array.isArray(value)
          ? value.some((v) => (fieldValue as string[]).includes(v))
          : (fieldValue as string[]).includes(value as string);
      }
      return false;

    case "notIncludes":
      if (Array.isArray(fieldValue)) {
        return Array.isArray(value)
          ? !value.some((v) => (fieldValue as string[]).includes(v))
          : !(fieldValue as string[]).includes(value as string);
      }
      return true;

    default:
      return false;
  }
}

/**
 * Evaluates ALL rule conditions for a product against a given decision input.
 * Returns a structured result with matched conditions and computed score.
 */
export function evaluateProductRule(
  rule: import("../types").OviProductRule,
  input: import("../types").OviDecisionInput,
): import("../types").OviRuleEvaluationResult {
  const matchedRecommendConditions: import("../types").OviRuleCondition[] = [];
  const matchedExclusionConditions: import("../types").OviRuleCondition[] = [];

  // Check recommendation conditions (ANY match = qualifies)
  for (const condition of rule.recommendIf) {
    const fieldValue = input[condition.field];
    if (evaluateCondition(condition, fieldValue)) {
      matchedRecommendConditions.push(condition);
    }
  }

  // Check exclusion conditions (ANY match = disqualified)
  for (const condition of rule.doNotRecommendIf) {
    const fieldValue = input[condition.field];
    if (evaluateCondition(condition, fieldValue)) {
      matchedExclusionConditions.push(condition);
    }
  }

  const excluded = matchedExclusionConditions.length > 0;
  const recommended = !excluded && matchedRecommendConditions.length > 0;

  // Score: rule priority × matched conditions ratio (0–100)
  const matchRatio =
    rule.recommendIf.length > 0 ? matchedRecommendConditions.length / rule.recommendIf.length : 0;
  const score = excluded ? 0 : Math.round(rule.priority * (0.5 + matchRatio * 0.5));

  return {
    productId: rule.productId,
    recommended,
    excluded,
    matchedRecommendConditions,
    matchedExclusionConditions,
    score,
  };
}
