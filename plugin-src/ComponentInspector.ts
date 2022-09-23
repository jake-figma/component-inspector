import ComponentAdapter from "./ComponentAdapter";
import { componentNodesFromSceneNodes, extractDataFromAdapter } from "./utils";

export class ComponentInspector {
  explicitBooleans = false;
  findText = false;
  showDefaultValues = true;

  constructor(
    explicitBooleans: boolean,
    findText: boolean,
    showDefaultValues: boolean
  ) {
    this.explicitBooleans = explicitBooleans;
    this.findText = findText;
    this.showDefaultValues = showDefaultValues;
  }

  process(nodes: SceneNode[]) {
    const relevantNodes = componentNodesFromSceneNodes(nodes);

    const adapter = new ComponentAdapter();

    relevantNodes.forEach((node) => adapter.add(node));
    const { instances, interfaces, types } = extractDataFromAdapter(
      adapter,
      this.showDefaultValues,
      this.explicitBooleans,
      this.findText
    );
    const json = JSON.stringify(adapter.json(), null, 2);
    return {
      json,
      interfaces: Object.values(interfaces),
      instances,
      types: Object.keys(types).map((name) => `type ${name} = ${types[name]};`),
      explicitBooleans: this.explicitBooleans,
      findText: this.findText,
      showDefaultValues: this.showDefaultValues,
    };
  }
}
