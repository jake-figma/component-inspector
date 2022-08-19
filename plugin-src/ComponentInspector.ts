import {
  componentNodesFromSceneNodes,
  extractTypesFromInstance,
  nodeToJsxTypeString,
  InterfaceDefinitionsObject,
  TypeDefinitionsObject,
} from "./utils";

export class ComponentInspector {
  explicitBooleans = false;
  showDefaultValues = true;

  constructor(explicitBooleans: boolean, showDefaultValues: boolean) {
    this.explicitBooleans = explicitBooleans;
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
          this.explicitBooleans
        );
      })
      .filter(Boolean);
    const interfaceString = Object.values(interfaces).join("\n\n");
    const typesString = Object.keys(types)
      .map((name) => `type ${name} = ${types[name]};`)
      .join("\n\n");
    return {
      ts: [typesString, interfaceString].join("\n\n"),
      jsx: instances.join("\n\n"),
      explicitBooleans: this.explicitBooleans,
      showDefaultValues: this.showDefaultValues,
    };
  }
}
