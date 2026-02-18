/**
 * Inventory Previewer – Grid of selected SKUs.
 * Bindable data (e.g. selectedRows array). Each cell: image (1:1), model, color, Available (SNT).
 * "Add Item" button per cell emits SKU.
 */

export default {
  editor: {
    label: { en: 'Inventory Previewer' },
    icon: 'layout-grid',
    customSettingsPropertiesOrder: ['data', 'addItemButtonText'],
    customStylePropertiesOrder: [
      'maxColumns',
      'cellColor',
      'textColor',
      'borderRadius',
      'borderOn',
      'borderColor',
      'borderWidth',
      'textAlignment',
      'quantityZeroOrBelowColor',
    ],
  },
  triggerEvents: [
    {
      name: 'addItem',
      label: { en: 'On Add Item' },
      event: { sku: '' },
      getTestEvent: 'getAddItemTestEvent',
      default: true,
    },
  ],
  properties: {
    data: {
      label: { en: 'Data' },
      type: 'ObjectList',
      section: 'settings',
      bindable: true,
      defaultValue: [],
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'Array of items with SKU, Model, Color, SNT, ImageLink (e.g. selectedRows from a datagrid).',
      },
      /* wwEditor:end */
    },
    addItemButtonText: {
      label: { en: 'Add Item button text' },
      type: 'Text',
      section: 'settings',
      defaultValue: 'Add Item',
      bindable: true,
    },
    // —— Style ——
    maxColumns: {
      label: { en: 'Max columns' },
      type: 'Number',
      section: 'style',
      defaultValue: 7,
      options: { min: 1, max: 12, step: 1 },
      bindable: true,
    },
    cellColor: {
      label: { en: 'Cell background' },
      type: 'Color',
      section: 'style',
      options: { nullable: true },
      defaultValue: '#ffffff',
    },
    textColor: {
      label: { en: 'Text color' },
      type: 'Color',
      section: 'style',
      options: { nullable: true },
      defaultValue: '#1e293b',
    },
    borderRadius: {
      label: { en: 'Border radius' },
      type: 'Length',
      section: 'style',
      options: { noRange: true },
      defaultValue: '8px',
    },
    borderOn: {
      label: { en: 'Border' },
      type: 'OnOff',
      section: 'style',
      defaultValue: true,
    },
    borderColor: {
      label: { en: 'Border color' },
      type: 'Color',
      section: 'style',
      options: { nullable: true },
      defaultValue: '#e2e8f0',
      hidden: (content) => !content.borderOn,
    },
    borderWidth: {
      label: { en: 'Border width' },
      type: 'Length',
      section: 'style',
      options: { noRange: true },
      defaultValue: '1px',
      hidden: (content) => !content.borderOn,
    },
    textAlignment: {
      label: { en: 'Text alignment' },
      type: 'TextRadioGroup',
      section: 'style',
      options: {
        choices: [
          { value: 'left', title: 'Left', icon: 'align-left', default: true },
          { value: 'center', title: 'Center', icon: 'align-center' },
          { value: 'right', title: 'Right', icon: 'align-right' },
        ],
      },
      defaultValue: 'left',
    },
    quantityZeroOrBelowColor: {
      label: { en: 'Quantity 0 or below color' },
      type: 'Color',
      section: 'style',
      options: { nullable: true },
      defaultValue: '#dc2626',
    },
  },
};
