<template>
  <div>
    <wrapper>
	<Tags :data-tags.sync="tags" />
	<Notes />
	<Types />
	<Calculator />
    </wrapper>
  </div>
</template>

<script lang="ts">
	import Types from '@/components/Types.vue'
	import Calculator from '@/components/Calculator.vue'
	import Notes from '@/components/Notes.vue'
	import Tags from '@/components/Tags.vue'

	export default {
		name: 'Money',
		components: { Tags, Notes, Types, Calculator },
		data(): unknown {
			return {
				tags: ['美食', '住宿', '出行', '娱乐'],
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>