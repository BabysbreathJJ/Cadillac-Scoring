/**
 * Created by Lijingjing on 17/3/5.
 */
import React, { Component } from 'react';
import './Page.css';
import Button from '../Button/Button';
import '../Button/Button.css';
import {Link} from 'react-router';

class Page extends Component {
    render() {
        let pageNos = [];
        let showSize = 5;
        let currentPage = this.props.currentPage;
        let startPage = this.props.startPage;
        let totalPage = this.props.totalPages;

        let prevPage = (currentPage - 1) > 0 ? (currentPage - 1) : 1;
        let nextPage = (currentPage + 1) > totalPage ? (currentPage) : (currentPage + 1);

        if ((startPage + 5) > totalPage) {
            showSize = (startPage + 5) - totalPage;

        }
        else {
            showSize = 5;
        }


        if (totalPage < 5)
            showSize = totalPage;


        for (let i = startPage; i < (startPage + showSize); i++) {
            if (currentPage == i)
                pageNos.push(<Link className="edit-link" key={i} to={{pathname:'/edit/'+i}}><Button className="btn btn-green  btn-clicked" name={i}
                                     onClick={this.props.goPage.bind(this,9,i)}/></Link>);
            else
                pageNos.push(<Link className="edit-link" key={i} to={{pathname:'/edit/'+i}}><Button className="btn btn-green" name={i}
                                     onClick={this.props.goPage.bind(this,9,i)}/></Link>);
        }


        return (

            <div className="page">
                <Button className="btn btn-green arrow" icon="fa fa-arrow-left"
                        onClick={this.props.goLeftPage.bind(this, 9, currentPage, prevPage)}/>

                {pageNos}

                < Button className="btn btn-green arrow" icon="fa fa-arrow-right"
                         onClick={this.props.goRightPage.bind(this, 9, currentPage, nextPage)}/>
            </div>
        )
            ;
    }
}

export default Page;
