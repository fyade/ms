<script setup lang="ts">
import { QuestionFilled } from "@element-plus/icons-vue";

type Placement =
    'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  placement: {
    type: String as () => Placement,
    default: 'top'
  }
});
</script>

<template>
  <el-tooltip
      :content="props.content"
      :placement="props.placement"
  >
    <div class="el">
      <el-icon>
        <QuestionFilled/>
      </el-icon>
      <slot/>
    </div>
  </el-tooltip>
</template>

<style scoped>
.el {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>