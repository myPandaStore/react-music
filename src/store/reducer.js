import { combineReducers } from 'redux-immutable';

import { reducer as recommendReducer } from '../pages/discover/child-pages/recommend/store';
import { reducer as toplistReducer } from '../pages/discover/child-pages/toplist/store';
import { reducer as songsReducer } from '../pages/discover/child-pages/songs/store';
import { reducer as themeHeaderReducer } from '@/components/app-header/store';

// 多个reducer合并
const cRducer = combineReducers({
  recommend: recommendReducer,
  toplist: toplistReducer,
  songList: songsReducer,
  themeHeader: themeHeaderReducer,
});

export default cRducer;
