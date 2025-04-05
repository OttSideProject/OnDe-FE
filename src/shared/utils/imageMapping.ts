type ImageMapping = {
  contentMain: { [key: string]: string };
  ranking: { [key: string]: string };
  recommended: { [key: string]: string };
  type: { [key: string]: string };
};

export const imageMapping: ImageMapping = {
  contentMain: {
    '즐겨찾는 콘텐츠': '/assets/images/sub_titles/main-favorite-contents.svg',
    '지금 가장 인기있는 영화':
      '/assets/images/sub_titles/main-popular-movies.svg',
    '지금 가장 인기있는 시리즈':
      '/assets/images/sub_titles/main-popular-series.svg',
    'NEW! 따끈따끈한 신작': '/assets/images/sub_titles/main-new.svg',
    '좋아하시죠?': '/assets/images/sub_titles/main-recommended-contents.svg',
    '지금 뜨는 ON생각': '/assets/images/sub_titles/main-board.svg',
    // ... 모든 contentMain 매핑 추가
  },
  ranking: {
    '지금 가장 HOT한 콘텐츠': '/assets/images/sub_titles/ranking-hot.svg',
    '전체 콘텐츠 랭킹': '/assets/images/sub_titles/ranking-all.svg',
    '콘텐츠 필터 기준 TOP 3':
      '/assets/images/sub_titles/content-filter-top3.svg',
    '4위 이하 콘텐츠 랭킹': '/assets/images/sub_titles/ranking4-and-below.svg',
    // ... 모든 ranking 매핑 추가
  },
  recommended: {
    예능: '/assets/images/sub_titles/recommended-entertainment.svg',
    다큐: '/assets/images/sub_titles/recommended-documentary.svg',
    범죄: '/assets/images/sub_titles/recommended-crime.svg',
    스릴러: '/assets/images/sub_titles/recommended-thriller.svg',
    뮤지컬: '/assets/images/sub_titles/recommended-musical.svg',
    SF: '/assets/images/sub_titles/recommended-sf.svg',
    청춘: '/assets/images/sub_titles/recommended-youth.svg',
    로맨스: '/assets/images/sub_titles/recommended-romance.svg',
    공포: '/assets/images/sub_titles/recommended-horror.svg',
    '요청하신 콘텐츠가 맞을까요?':
      '/assets/images/sub_titles/recommended-main.svg',
    '엄선한 TOP 10': '/assets/images/sub_titles/recommended-top10.svg',
    코미디: '/assets/images/sub_titles/recommended-comedy.svg',
    애니: '/assets/images/sub_titles/recommended-animation.svg',
    액션: '/assets/images/sub_titles/recommended-action.svg',
    드라마: '/assets/images/sub_titles/recommended-drama.svg',
    판타지: '/assets/images/sub_titles/recommended-fantasy.svg',
    // ... 모든 recommend mappings 추가
  },
  type: {
    '온 세상 모든 영화는 온-디': '/assets/images/sub_titles/type-movie.svg',
    '온 세상 모든 드라마는 온-디': '/assets/images/sub_titles/type-drama.svg',
    '온 세상 모든 다큐는 온-디': '/assets/images/sub_titles/type-docu.svg',
    '온 세상 모든 애니는 온-디': '/assets/images/sub_titles/type-ani.svg',
    '온 세상 모든 예능은 온-디': '/assets/images/sub_titles/type-enter.svg',
    '지루한 일상에 새로운 콘텐츠': '/assets/images/sub_titles/type-new.svg',
    // ... 모든 type mappings 추가
  },
};
