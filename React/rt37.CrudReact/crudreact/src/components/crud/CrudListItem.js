//외부에서 컴포넌트 불러오기
import React, { Component } from 'react';

class CrudListItem extends React.Component {
    
    static defaultProps = {  /*  props의 디폴트 값 설정 */  } 
    static propsTypes = {  /* props의 프로퍼티 타입 설정 */ } 
    state = {
        // 상태값(변수)을 정의한다.
        isEditMode : false,
    }
    style = {
        // 컴포넌트 내부에서 사용할 인라인 스타일을 정의한다.

    }
    func = {
        // func에 정의된 메서드는 반드시 constructor에서 this bind() 해야 한다.

    }
    constructor(props) {
        super(props);
        // this 바인딩 // func 에 정의한 매서드는 반드시 this bind 처리해야 한다.
        
        // ref 만들기
        this.refName = React.createRef();
        this.refPower = React.createRef();
    }
    componentDidMount() {
        // 마운트 완료 후에  : 페이지 load 될 때 한번
    }
    componentDidUpdate(prevProps, prevState) {
        // 업데이트 완료 후에 : 여러번, state 가 변경될 때마다
    }
    componentWillUnmount() {
        // 언마운트 완료 후에 : 페이지 unload 될 때 한번
        //사용되는 경우 : 이벤트 핸들러 해제, redux 구독 해제
    }
    doDel = (event)=>{
        //state 변경 . state는 부모에 있다 -> 부모 메서드 호출
        //부모 콜백 메서드 호출
        const item = this.props.item;
        const index = this.props.index;
        this.props.doDel(index, item);

    }
    doUp = (event)=>{
        const item = this.props.item;
        const index = this.props.index;
        this.props.doUp(index, item);

    }
    doDown = (event)=>{
        const item = this.props.item;
        const index = this.props.index;
        this.props.doDown(index, item);
    }
    doEdit = (event)=>{
        
        //this.state.isEditMode = !this.state.isEditMode;
        this.setState({
            ...this.state,
            isEditMode: !this.state.isEditMode
        })

    }
    doSave = (event) => {
        //debugger;

        this.setState({
            ...this.state,
            isEditMode : !this.state.isEditMode
        });

        //newitem 만들기
        let newitem = this.props.item;
        newitem.name = this.refName.current.value;
        newitem.power = Number(this.refPower.current.value);

        //부모 콜백 메서드 호출
        this.props.doSave(newitem);
    }
    render() {
        const {index, item} = this.props; //분해할당

        const formView = (
            <tr key={index} className="">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.power}</td>
                <td>
                    <button onClick={this.doDel}>Del</button>
                    <button onClick={this.doUp}>Power Up</button>
                    <button onClick={this.doDown}>Power Down</button>
                    <button onClick={this.doEdit}>Edit</button>
                </td>
            </tr>
        );
        const formEdit =(

            <tr key={index} className="">
                <td>{item.id}</td>
                <td>
                    <input
                        type="text"
                        name="name"
                        ref={this.refName}
                        defaultValue={item.name}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="power"
                        ref={this.refPower }
                        defaultValue={item.power}
                    />
                </td>
                <td>
                    <button onClick={this.doUp}>Power Up</button>
                    <button onClick={this.doDown}>Power Down</button>
                    <button onClick={this.doSave}>Save</button>
                </td>
            </tr>

            

        );
        if ( this.state.isEditMode ){
            return formEdit;
        }else{
            return formView;
        }
        
    }
}

export default CrudListItem;
