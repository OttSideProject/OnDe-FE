const imageMapping: {
  contentMain: { [key: string]: string },
  ranking: { [key: string]: string },
  recommended: { [key: string]: string }
} = {
  contentMain: {
    '즐겨찾는 콘텐츠': '/assets/images/sub_titles/main-favorite-contents.svg',
    '지금 가장 인기있는 영화': '/assets/images/sub_titles/main-popular-movies.svg',
    '지금 가장 인기있는 시리즈': '/assets/images/sub_titles/main-popular-series.svg',
    'NEW! 따끈따끈한 신작': '/assets/images/sub_titles/main-new.svg',
    '소년만화 좋아하시죠?': '/assets/images/sub_titles/main-boy-animation.svg',
    '지금 뜨는 ON생각': '/assets/images/sub_titles/main-board.svg',
    // ... add all contentMain mappings here
  },
  ranking: {
    '지금 가장 HOT한 콘텐츠': '/assets/images/sub_titles/ranking-hot.svg',
    '전체 콘텐츠 랭킹': '/assets/images/sub_titles/ranking-all.svg',
    // ... add all ranking mappings here
  },
  recommended: {
    '리얼리티': '/assets/images/sub_titles/recommended-reality.svg',
    '다큐': '/assets/images/sub_titles/recommended-documentary.svg',
    '범죄': '/assets/images/sub_titles/recommended-crime.svg',
    '스릴러': '/assets/images/sub_titles/recommended-thriller.svg',
    '뮤지컬': '/assets/images/sub_titles/recommended-musical.svg',
    'SF': '/assets/images/sub_titles/recommended-sf.svg',
    '청춘': '/assets/images/sub_titles/recommended-youth.svg',
    '로맨스': '/assets/images/sub_titles/recommended-romance.svg',
    '공포': '/assets/images/sub_titles/recommended-horror.svg',
    '요청하신 콘텐츠가 맞을까요?': '/assets/images/sub_titles/recommended-main.svg',
    '엄선한 TOP 10': '/assets/images/sub_titles/recommended-top10.svg',
    '코미디': '/assets/images/sub_titles/recommended-comedy.svg',
    '애니': '/assets/images/sub_titles/recommended-animation.svg',
    '액션': '/assets/images/sub_titles/recommended-action.svg',
    '드라마': '/assets/images/sub_titles/recommended-drama.svg',
    '판타지': '/assets/images/sub_titles/recommended-fantasy.svg',
    // ... add all recommend mappings here
  }
};

export default imageMapping;