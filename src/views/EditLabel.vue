<template>
	<wrapper>
		编辑标签
	</wrapper>
</template>

<script lang="ts">
	import { tagsModel } from '@/models/tagsModel';
import Vue from 'vue'
	import { Component } from 'vue-property-decorator'

	@Component
	export default class EditLabel extends Vue {
		created(): void {
			const id = this.$route.params.id;
			tagsModel.fetch();
			const tag = tagsModel.data.filter((item) => item.id === id)[0];
			if(tag) {
				console.log(tag);
			} else {
				this.$router.replace('/404');
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>