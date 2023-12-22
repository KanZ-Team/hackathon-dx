<template>
  <div
    class="petPoints"
    :style="{
      '--arrow-angle': angleDegrees + 'deg'
    }"
  >
    <slot />
  </div>
</template>

<script>
export default defineComponent({
  data() {
    return {
      isMouseDown: false,
      angleDegrees: 90
    }
  },
  emits: ['pet'],
  mounted() {
    document
      .querySelector('.starting.point')
      ?.addEventListener('mousedown', this.onStart)
    window?.addEventListener('mouseup', this.onMouseUp)
    document.querySelectorAll('.point')?.forEach((node) => {
      node?.addEventListener('mousemove', this.move)
    })
  },
  beforeUnmount() {
    document.querySelectorAll('.point')?.forEach((node) => {
      node?.removeEventListener('mousemove', this.move)
    })
    window?.removeEventListener('mouseup', this.onMouseUp)
    document
      .querySelector('.starting.point')
      ?.removeEventListener('mousedown', this.onStart)
  },
  methods: {
    onStart(event) {
      console.log('starting')
      this.isMouseDown = true
      this.move(event)
    },
    onMouseUp(event) {
      console.log('stopping')
      this.isMouseDown = false
      // remove all active
      document.querySelectorAll('.point').forEach((node) => {
        node.classList.remove('active')
      })
      // remove all last
      document.querySelectorAll('.last').forEach((node) => {
        node.classList.remove('last')
      })
      // add last to starting
      document.querySelector('.starting').classList.add('last')
      this.angleDegrees = 90
      document.querySelector('.point.starting').classList.add('active')
    },
    move(event) {
      if (!this.isMouseDown) return
      const isCurrentPoint =
        document.querySelector('.point.active') === event.currentTarget
      if (event.currentTarget.classList.contains('ending')) {
        this.$emit('pet')
        // remove last
        document.querySelectorAll('.last').forEach((node) => {
          node.classList.remove('last')
        })
        // remove all active
        document.querySelectorAll('.point').forEach((node) => {
          node.classList.remove('active')
        })
        this.isMouseDown = false
        return
      }
      if (isCurrentPoint) {
        const last = event.currentTarget
        const next = document.querySelector('.point.active + .point')
        // send it to the next point
        next.classList.add('active')
        document.querySelectorAll('.last').forEach((node) => {
          node.classList.remove('last')
        })
        last.classList.add('last')
        last.classList.remove('active')

        // arrow to next
        //	get bounding rectangle of both
        let firstPosition = last.getBoundingClientRect()
        let secondPosition = next.getBoundingClientRect()
        //	get center of both
        let firstCenter = {
          x: firstPosition.left + firstPosition.width / 2,
          y: firstPosition.top + firstPosition.height / 2
        }
        let secondCenter = {
          x: secondPosition.left + secondPosition.width / 2,
          y: secondPosition.top + secondPosition.height / 2
        }
        //	get angle between both
        let angleRadians = Math.atan2(
          secondCenter.y - firstCenter.y,
          secondCenter.x - firstCenter.x
        )
        let angleDegrees = (angleRadians * 180) / Math.PI
        //	rotate arrow
        this.angleDegrees = angleDegrees
      }
    }
  }
})
</script>

<style lang="scss">
.petPoints {
  display: flex;
  flex-direction: column;
  .point {
    user-select: none;
    background: transparent;
    width: 1rem;
    height: 0.1rem;
    position: relative;

    &.last {
      &:after {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        background-image: url('@/assets/icons/arrow.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        left: 20%;
        top: 50%;
        transform: translateY(-50%) rotateZ(var(--arrow-angle));
      }
      &.starting {
        &:after {
          display: none;
        }
      }
    }
  }
}
</style>
