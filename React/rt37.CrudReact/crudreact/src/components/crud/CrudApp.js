//외부에서 컴포넌트 불러오기
import React, { Component } from 'react';
import CrudInput from './CrudInput';
import CrudList from './CrudList';

class CrudApp extends React.Component {
    
    static defaultProps = {  /*  props의 디폴트 값 설정 */  } 
    static propsTypes = {  /* props의 프로퍼티 타입 설정 */ } 
    state = {
        // 상태값(변수)을 정의한다.
        list: [
            { id: 1, name: "슈퍼맨", power: 100 },
            { id: 2, name: "아쿠아맨", power: 300 },
            { id: 3, name: "스파이더맨", power: 500 },
            { id: 4, name: "배트맨", power: 30 },
        ],
    }
    style = {
        // 컴포넌트 내부에서 사용할 인라인 스타일을 정의한다.

    }
    func = {
        // fucn에 정의된 메서드는 반드시 constructor에서 this bind() 해야 한다.
        doIns(obj){
            // this.state.list.push( obj );
            // 작업순서
            // 1.this.state.listㅇ서 최대값
            // 2. this.state.;list.push(obj);

            /*
            1. this.state.list에서 max(id)구하기
            reduce() 사용하는 방법
            map()과 Math.max()를 사용하는 방법
            */

            if(this.state.list.length > 0 ){
                const maxitem = this.state.list.reduce( (prev,  next) =>{
                    return prev.id > next.id ? prev : next;
                })
                obj.id = maxitem.id + 1;
            }
            else {
                obj.id = 1;
            }

            //신규 리스트 생성.
            const newlist = [ ...this.state.list, obj ];
            this.setState({
                ...this.state,
                list: newlist,
            })
        },
        doDel (index, item){
            const r = window.confirm("정말로 삭제하시겠습니까?");
            if(!r) return false;

            //배열에서 삭제
            const id = item.id;
            //삭제할 item을 제외한 배열 만들기
            const newlist = this.state.list.filter((item, index)=>{
                return item.id !== id;
            })
            this.setState({
                ...this.sate,
                list : newlist
            })
        },
        doUp (index, item){
           const id = item.id;
           
           const newlist = this.state.list.filter((item, index)=>{
               if(item.id === id){
                   item.power = Number(item.power) + 100;
               }
                return item;
            })
            this.setState({
                ...this.sate,
                list : newlist
            })

        },
        doDown (index, item){
            const id = item.id;
           
           const newlist = this.state.list.filter((item, index)=>{
               if(item.id === id){
                   item.power = Number(item.power) - 50;
               }
                return item;
            })
            this.setState({
                ...this.sate,
                list : newlist
            })
        },
        doSave(newitem){
            const id = newitem.id;
            const newlist = this.state.list.filter((item, index)=>{
               if(item.id === id){
                   return newitem;
               }else{
                    return item;
               }
            })
            this.setState({
                ...this.sate,
                list : newlist
            })
        }

    }
    constructor(props) {
        super(props);
        // this 바인딩
        this.func.doIns = this.func.doIns.bind(this);

        this.func.doDel = this.func.doDel.bind(this);
        this.func.doUp = this.func.doUp.bind(this);
        this.func.doDown = this.func.doDown.bind(this);
        this.func.doSave = this.func.doSave.bind(this);
        
        // ref 만들기
        
    }
    componentDidMount() {
        // 마운트 완료 후에  : 페이지 load 될 때 한번
    }
    componentDidUpdate(prevProps, prevState) {
        // 업데이트 완료 후에 : 여러번, state 가 변경될 때마다
    }
    componentWillUnmount() {
        // 언마운트 완료 후에 : 페이지 unload 될 때 한번
    }
    handler = (event)=>{
        // 이벤트 핸들러는 화살표 함수로 만들면 this bind()를 생략해도 된다
        console.log(event.target);//
    }
    render() {
        return (
            <div>
                <CrudInput {...this.func}></CrudInput>
                <hr />
                <CrudList {...this.state} {...this.func}></CrudList>
            </div>
        );
    }
}
export default CrudApp;