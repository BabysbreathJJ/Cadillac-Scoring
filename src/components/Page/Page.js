/**
 * Created by sunbingyi on 2017/3/14.
 */
import React, {Component} from 'react';
import Button from '../Button/Button';
import '../Button/Button.css';
import './Page.css';

class Page extends Component{
    constructor(props){
        super(props);

        this.changePage = this.changePage.bind(this);

        //
        // this.prevPage = this.prevPage.bind(this);
        // this.nextPage = this.nextPage.bind(this);

    }

    changePage(i){
        this.props.changePage(i);
    }


    // prevPage(){
    //     this.props.prevPage();
    // }
    //
    // nextPage(){
    //     this.props.nextPage();
    // }

    render(){
        var totalpage = this.props.totalpage;

        if(totalpage === 0)
            return null;

        var pageno = this.props.pageno;
        var buttons = [];
        for(let i=1; i <= totalpage; i++){
            var className = (i === pageno) ? "my-btn-page my-btn-selected" : "my-btn-page my-btn-green";
            buttons.push((<Button key={i.toString()} className={className} name={i} onClick={() =>{this.props.changePage(i)}}/>));

        }
        return (
                    <div className="page">
                        <Button className="my-btn-page my-btn-green" icon="fa fa-chevron-left" onClick={() => this.props.prevPage()}/>
                        {buttons}
                        <Button className="my-btn-page my-btn-green" icon="fa fa-chevron-right" onClick={() => this.props.nextPage()}/>
                    </div>

                );
    }
}
export default Page;