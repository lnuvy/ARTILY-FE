import React, { useCallback, useEffect } from "react";
import _ from "lodash";

//5.20 아직 구현중입니다
const InfinityScroll = (props)=>{
    const {children,callNext,is_next,loading}=props;

    //게시글을 불러오는 중(loading)일때는 다음 거 안부를거야
    const _handleScroll = _.throttle(()=>{
        if(loading){
            return;
        }
        callNext();//받아온 다음 리스트로 보내
    },300)

    const handleScroll = useCallback(_handleScroll,[loading]);

    //스크롤 이벤트 만들기
    //처음 이벤트가 됐을 때
    useEffect(()=>{
        if(loading){
            return;
        }
        // is_next가 있으면(true) 이벤트 실행
        if(is_next){
            window.addEventListener("scroll",handleScroll)
        }else{
            window.removeEventListener("scroll",handleScroll)
        }
    //이벤트 구독해제
    //clean-up
    //함수형 컴포넌트가 화면에서 사라질때 return문 실행(=unMount)
    return () => window.removeEventListener("scroll",handleScroll)
},[is_next,loading]);

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

InfinityScroll.defaultProps = {
    children:null,
    callNext:()=>{},
    is_next:false,//다음에 올 리스트가 있는지를 알아야 callNext를 부를지 말지 결정할 수 있다
    loading:false,//아직 다음 걸 불러오지를 않았는데 같은 데이터를 불러오는걸 방지
}

export default InfinityScroll;