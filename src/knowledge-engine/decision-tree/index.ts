/**
 * OVI Knowledge Engine — Decision Tree Module
 * FASE 2 · Foundation Order 002
 *
 * Exports the canonical 8-step OVI cleaning decision tree.
 */

export {
  decisionTree,
  getEntryNode,
  getDecisionNode,
  getNextNode,
  getDecisionFlow,
} from "./cleaning-decision-tree";

export type { OviDecisionNode, OviDecisionOption, OviDecisionPath } from "../types";
