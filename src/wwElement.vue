<template>
  <div class="inv-previewer" :style="gridStyle">
    <div
      v-for="(item, index) in items"
      :key="item.SKU || index"
      class="inv-previewer__cell"
      :style="cellStyle"
    >
      <div class="inv-previewer__img-wrap">
        <img
          v-if="item.ImageLink"
          :src="item.ImageLink"
          :alt="item.Model"
          class="inv-previewer__img"
        />
        <div v-else class="inv-previewer__img-placeholder">No image</div>
      </div>
      <div class="inv-previewer__body" :style="bodyStyle">
        <div class="inv-previewer__model">{{ item.Model || '—' }}</div>
        <div class="inv-previewer__color">{{ item.Color || '—' }}</div>
        <div class="inv-previewer__qty" :style="qtyStyle(item)">
          {{ formatQty(item.SNT) }} Available
        </div>
      </div>
      <button
        v-if="showAddButton"
        type="button"
        class="inv-previewer__btn"
        :style="buttonStyle"
        @click="onAddItem(item)"
      >
        {{ addItemLabel }}
      </button>
    </div>
    <div v-if="!items.length" class="inv-previewer__empty">
      Bind data to show selected SKUs.
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'InvPreviewer',
  props: {
    content: { type: Object, required: true },
    uid: { type: String, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    const items = computed(() => {
      const raw = wwLib.wwUtils.getDataFromCollection(props.content.data);
      const arr = Array.isArray(raw) ? raw : Array.isArray(props.content.data) ? props.content.data : [];
      return arr.map((row) => (row && row.value != null ? row.value : row));
    });

    const addItemLabel = computed(
      () => props.content.addItemButtonText || 'Add Item'
    );

    function onAddItem(item) {
      /* wwEditor:start */
      if (props.wwEditorState?.editMode === wwLib?.wwEditorHelper?.EDIT_MODES?.EDITION) return;
      /* wwEditor:end */
      const sku = item?.SKU ?? item?.sku ?? '';
      emit('trigger-event', { name: 'addItem', event: { sku } });
    }

    return {
      items,
      addItemLabel,
      onAddItem,
    };
  },
  computed: {
    gridStyle() {
      const cols = Math.max(1, Math.min(12, Number(this.content.maxColumns) || 7));
      return {
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      };
    },
    cellStyle() {
      const c = this.content;
      const fontSize = Math.max(10, Math.min(24, Number(c.fontSize) || 14));
      return {
        '--inv-cell-bg': c.cellColor || '#ffffff',
        '--inv-text-color': c.textColor || '#1e293b',
        '--inv-radius': c.borderRadius || '8px',
        '--inv-border': c.borderOn
          ? `${c.borderWidth || '1px'} solid ${c.borderColor || '#e2e8f0'}`
          : 'none',
        '--inv-qty-low-color': c.quantityZeroOrBelowColor || '#dc2626',
        '--inv-font-size': `${fontSize}px`,
      };
    },
    bodyStyle() {
      const align = this.content.textAlignment || 'left';
      return { textAlign: align };
    },
    buttonStyle() {
      const align = this.content.textAlignment || 'left';
      const alignSelfMap = { left: 'flex-start', center: 'center', right: 'flex-end' };
      return { alignSelf: alignSelfMap[align] || 'flex-start' };
    },
    showAddButton() {
      return this.content.showAddButton !== false;
    },
  },
  methods: {
    formatQty(val) {
      const n = Number(val);
      return Number.isNaN(n) ? '0' : String(n);
    },
    /* wwEditor:start */
    getAddItemTestEvent() {
      const data = this.items;
      const first = data && data[0];
      return { sku: (first && (first.SKU || first.sku)) || '' };
    },
    /* wwEditor:end */
    qtyStyle(item) {
      const n = Number(item?.SNT ?? item?.snt ?? 0);
      if (Number.isNaN(n) || n <= 0) {
        return { color: 'var(--inv-qty-low-color)' };
      }
      return {};
    },
  },
};
</script>

<style scoped>
/* !important so WeWeb Sizing/Display don't override grid layout. width 100% so columns autofit within container. */
.inv-previewer {
  display: grid !important;
  gap: 1rem;
  width: 100% !important;
  max-width: 100%;
}

.inv-previewer__cell {
  background: var(--inv-cell-bg);
  border: var(--inv-border);
  border-radius: var(--inv-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: var(--inv-text-color);
  min-width: 0;
}

.inv-previewer__img-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #f1f5f9;
  flex-shrink: 0;
}

.inv-previewer__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.inv-previewer__img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #94a3b8;
}

.inv-previewer__body {
  padding: 0.75rem;
  flex: 1;
  font-size: var(--inv-font-size, 14px);
}

.inv-previewer__model {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  margin-bottom: 2px;
}

.inv-previewer__color {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  margin-bottom: 4px;
}

.inv-previewer__qty {
  font-size: 0.9em;
  margin-top: 4px;
}

.inv-previewer__btn {
  margin: 0 0.75rem 0.75rem;
  padding: 8px;
  width: auto;
  height: auto;
  align-self: flex-start;
  flex-shrink: 0;
  font-size: var(--inv-font-size, 14px);
  font-family: inherit;
  font-weight: 500;
  color: #fff;
  background: #2563eb;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.inv-previewer__btn:hover {
  background: #1d4ed8;
}

.inv-previewer__empty {
  grid-column: 1 / -1;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 14px;
}
</style>
