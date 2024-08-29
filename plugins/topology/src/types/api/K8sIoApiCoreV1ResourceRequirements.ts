/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * KubeVirt API
 * This is KubeVirt API an add-on for Kubernetes.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: kubevirt-dev@googlegroups.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * ResourceRequirements describes the compute resource requirements.
 */
export class K8sIoApiCoreV1ResourceRequirements {
  /**
   * Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
   */
  'limits'?: { [key: string]: string };

  /**
   * Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
   */
  'requests'?: { [key: string]: string };

  static readonly discriminator: string | undefined = undefined;

  static readonly attributeTypeMap: {
    name: string;
    baseName: string;
    type: string;
    format: string;
  }[] = [
    {
      name: 'limits',
      baseName: 'limits',
      type: '{ [key: string]: string; }',
      format: '',
    },
    {
      name: 'requests',
      baseName: 'requests',
      type: '{ [key: string]: string; }',
      format: '',
    },
  ];

  static getAttributeTypeMap() {
    return K8sIoApiCoreV1ResourceRequirements.attributeTypeMap;
  }

  // public constructor() {}
}