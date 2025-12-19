<template>
  <svg :width="width" :height="height" :viewBox="'0 0 ' + width + ' ' + height">
    <rect
      v-for="(bar, index) in bars"
      :key="index"
      :x="bar.x"
      y="0"
      :width="bar.width"
      :height="height"
      :fill="lightColor"
    >
      <animate
        attributeName="fill"
        :values="lightColor + ';' + darkColor"
        :keyTimes="'0;' + bar.keyTime"
        :dur="duration + 's'"
        repeatCount="indefinite"
        calcMode="discrete"
      />
    </rect>
  </svg>
</template>

<script>
export default {
  name: 'LoadingBars',
  props: {
    width: {
      type: Number,
      default: 128
    },
    height: {
      type: Number,
      default: 15
    },
    barCount: {
      type: Number,
      default: 12
    },
    duration: {
      type: Number,
      default: 1.3
    },
    lightColor: {
      type: String,
      default: '#e0e0e0'
    },
    darkColor: {
      type: String,
      default: '#989898'
    }
  },
  computed: {
    bars() {
      const gap = 4;
      const totalGaps = (this.barCount - 1) * gap;
      const barWidth = (this.width - totalGaps) / this.barCount;

      return Array.from({ length: this.barCount }, (_, i) => {
        const x = i * (barWidth + gap)
        const keyTime = (i + 1) / (this.barCount + 1)

        return {
          x,
          width: i === this.barCount - 1 ? this.width - x : barWidth,
          keyTime
        }
      })
    }
  }
}
</script>
