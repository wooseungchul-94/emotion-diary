export const normalizeDiaryList = (raw) => {
  if (!raw) return [];

  // raw가 { diaryList: [...] } 일 수도 있음
  const list = Array.isArray(raw) ? raw : raw.diaryList;

  return list.map((item) => ({
    ...item,
    createdDate: new Date(item.createDate || item.createdDate).getTime(),
  }));
};