import {
  componentNodesFromSceneNodes,
  extractTypesFromInstance,
  nodeToJsxTypeString,
  InterfaceDefinitionsObject,
  TypeDefinitionsObject,
} from "./utils";

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
    const types: TypeDefinitionsObject = {};
    const interfaces: InterfaceDefinitionsObject = {};
    const instances = relevantNodes
      .map((instance) => {
        extractTypesFromInstance(instance, interfaces, types);
        return nodeToJsxTypeString(
          instance,
          this.showDefaultValues,
          this.explicitBooleans,
          this.findText
        );
      })
      .filter(Boolean);
    return {
      interfaces: Object.values(interfaces),
      instances,
      types: Object.keys(types).map((name) => `type ${name} = ${types[name]};`),
      explicitBooleans: this.explicitBooleans,
      findText: this.findText,
      showDefaultValues: this.showDefaultValues,
    };
  }
}
