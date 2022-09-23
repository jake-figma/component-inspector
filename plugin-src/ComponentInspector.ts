import ComponentAdapter from "./ComponentAdapter";
import { componentNodesFromSceneNodes, extractDataFromAdapter } from "./utils";

export class ComponentInspector {
  explicitBooleans = false;
  findText = false;
  showDefaultValues = true;
  adapter = new ComponentAdapter();

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
    this.adapter.clear();
    const relevantNodes = componentNodesFromSceneNodes(nodes);

    relevantNodes.forEach((node) => this.adapter.add(node));
    const { instances, interfaces, types } = extractDataFromAdapter(
      this.adapter,
      this.showDefaultValues,
      this.explicitBooleans,
      this.findText
    );
    const json = JSON.stringify(this.adapter.json(), null, 2);
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
