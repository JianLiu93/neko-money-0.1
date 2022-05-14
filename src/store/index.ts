import Vue from 'vue'
import Vuex from 'vuex'
import createId from '@/models/createId';

Vue.use(Vuex)

const tagBasic: Tag[] = [
	{id: '1', name:'美食'}, 
	{id: '2', name:'住宿'}, 
	{id: '3', name:'出行'}, 
	{id: '4', name:'衣妆'}, 
	{id: '5', name:'娱乐'}
]
function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordData[],
    tagList: [] as Tag[],
    currentTag: null as Tag | null,
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
      copyRecord.createdAt = new Date().toISOString();
      state.recordList && state.recordList.push(copyRecord);
      store.commit('saveRecords');
    },

    // tagsModel part
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if(state.tagList.length === 0) {state.tagList = tagBasic}
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTags(state, name) {
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
      state.tagList.push({id: id, name: name});
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
    removeTags(state, id: string) {
      let index = -1;
      for(let i=0; i<state.tagList.length; i++) {
        if(state.tagList[i].id ===id) {
        index = i;
        break;
        }
      }
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