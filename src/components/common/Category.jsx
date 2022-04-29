import React from "react";
import Grid from "../../elements/Grid";

const Category = () => {
  const category = [
    "전체",
    "회화",
    "오브제",
    "가구",
    "패션/주얼리",
    "사진/포스터",
    "디지털 작업물",
    "기타",
  ];

  return (
    <>
      {category.map((c) => (
        <Grid key={`category_${c}`}>{c}</Grid>
      ))}
    </>
  );
};

export default Category;
