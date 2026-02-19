/**
 * Inventory Previewer – Grid of selected SKUs.
 * Bindable data (e.g. selectedRows array). Each cell: image (1:1), model, color, Available (SNT).
 * "Add Item" button per cell emits SKU.
 */

export default {
  editor: {
    label: { en: 'Inventory Previewer' },
    icon: 'layout-grid',
    customSettingsPropertiesOrder: ['data', 'addItemButtonText', 'showAddButton', 'displaySku'],
    customStylePropertiesOrder: [
      'maxColumns',
      'fontSize',
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
      event: { Booking_Items: { SKU: '', Quantity: 0, Status: null } },
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
    showAddButton: {
      label: { en: 'Display Add to cart button' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'True to show the Add Item button, false to hide it.',
      },
      /* wwEditor:end */
    },
    displaySku: {
      label: { en: 'Display SKU' },
      type: 'OnOff',
      section: 'settings',
      defaultValue: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean',
        tooltip: 'True to show SKU in each cell under Available, false to hide it.',
      },
      /* wwEditor:end */
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
    fontSize: {
      label: { en: 'Font size' },
      type: 'Number',
      section: 'style',
      defaultValue: 14,
      options: { min: 10, max: 24, step: 1 },
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Font size in pixels for cell text.',
      },
      /* wwEditor:end */
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
