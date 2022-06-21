import Vue from 'vue'
import Vuex from 'vuex'
import createId from '@/models/createId';
import { tagsModel } from '@/models/tagsModel';

Vue.use(Vuex)

const tagBasic_out: Tag[] = [
	{id: '1', name:'餐饮', icon:'can_yin'}, 
	{id: '2', name:'住宿', icon:'zhu_su'}, 
	{id: '3', name:'出行', icon:'chu_xing'}, 
	{id: '4', name:'衣装', icon:'yi_zhuang'}, 
	{id: '5', name:'娱乐', icon:'yu_le'},
	{id: '6', name:'日用', icon:'ri_yong'},
];
const tagBasic_in: Tag[] = [
	{id: '1', name:'工资', icon:'gong_zi'}, 
	{id: '2', name:'奖金', icon:'jiang_jin'}, 
	{id: '3', name:'营业', icon:'ying_ye'}, 
	{id: '4', name:'兼职', icon:'jian_zhi'}, 
	{id: '5', name:'报销', icon:'bao_xiao'},
	{id: '6', name:'投资', icon:'tou_zi'},
	{id: '7', name:'零花', icon:'ling_hua'},
];

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordData[],
    tagList: [] as Tag[],
    currentTag: null as (Tag | null),
  },
  getters: {
    fetchTagsIn: (state) => tagBasic_in,
  },
  mutations: {
    // recordModel part
    fetchRecords(state): void {
      state.recordList =  JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    saveRecords(state): void {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecords(state, record: RecordData): void {
      const copyRecord: RecordData = clone(record);
      copyRecord.createdAt = copyRecord.createdAt || new Date().toISOString();
      state.recordList && state.recordList.push(copyRecord);
      store.commit('saveRecords');
    },

    // tagsModel part
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(state.tagList.length === 0) {state.tagList = tagBasic_out}
    },

    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTags(state, {name, icon = ''}) {
      const dataNames = state.tagList.map((item) => item.name);
    // 成功和失败有返回值，失败返回原因，1重复
      if(!name) {
        window.alert('标签名为空！');
        return;
      } else if(dataNames.indexOf(name) >= 0) {
        window.alert('标签名重复！');
        return;
      }
      const id = createId().toString();
      if(icon === '') {icon = tagsModel.searchIcon(name)}
      state.tagList.push({ id: id, name: name, icon:icon });
      store.commit('saveTags');
    },
    updateTags(state,payload: {id: string, name: string}) {
      const {id, name} = payload;
      if(!name) {
        window.alert('标签名为空！');
        return;
      }
      const idList = state.tagList.map((item) => item.id);
      if(idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if(names.indexOf(name) >= 0) {
        window.alert('标签名重复！');
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      } else {
        window.alert('没有找到标签！');
        return;
      }
    },
    removeTags(state, name: string) {
      const dataNames = state.tagList.map((item) => item.name);
      const index = dataNames.indexOf(name);
      if(index >= 0) {
        state.tagList.splice(index,1);
        store.commit('saveTags');
      } else {
        window.alert('删除失败！');
      }
    },

    // currentTag
    setCurrentTag(state, id:string) {
      const idList = state.tagList.map((item) => item.id);
      if(idList.indexOf(id) >= 0) {
        const tag = store.state.tagList.filter((item) => item.id === id)[0];
        state.currentTag = tag;
      } else {
        state.currentTag = null;
      }
    }

  },
  actions: {
  },
  modules: {
  }
})

export default store;