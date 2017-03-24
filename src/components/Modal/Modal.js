/**
 * Created by Lijingjing on 17/3/22.
 */
/**
 * Created by Lijingjing on 17/2/26.
 */
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Button from '../Button/Button'
class Modal extends Component {

    render() {
        return (
                <ReactModal
                    isOpen={this.props.showModal}
                    contentLabel="myModal"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <div className="modal-header">
                        <h4 className="display-inline-block modal-title">{this.props.modalTitle}</h4>
                        <div className="display-inline-block float-right" style={{margin:'5px'}}>
                            { !this.props.edit ?
                                <Button className="my-btn my-btn-green my-btn-small" icon="fa fa-pencil-square-o fa-lg"
                                        onClick={this.props.editModule}/>
                                :
                                < Button className="my-btn my-btn-green my-btn-small" icon="fa fa-plus fa-lg"
                                         onClick={this.props.add}/>
                            }
                            { this.props.edit ?
                                <Button className="my-btn my-btn-green float-right my-btn-small" icon="fa fa-save fa-lg"
                                        style={{marginBottom:'0px',marginRight:'5px'}} onClick={this.props.saveItems}/> :
                                <Button className="my-btn my-btn-red float-right my-btn-small" icon="fa fa-close fa-lg"
                                        style={{marginBottom:'0px',marginRight:'5px'}} onClick={this.props.handleCloseModal}/>

                            }
                        </div>
                    </div>
                    <div className="modal-content">
                        {
                            this.props.items.map((item, index)=>(
                                    <div key={index} style={{margin : '0 auto',textAlign: 'center'}}>
                                        {!this.props.edit ? ( <div className="list-item"
                                                                   onClick={(event)=> this.props.setModule(this.props.modalTitle,item.id,item.name)}
                                                                   >
                                            {item.name}
                                        </div>) :
                                            (<div style={{clear: 'both'}}>
                                                    <input type="text" value={item.name}
                                                           style={{width: '80%'}}
                                                           onChange={(event) => this.props.changeItem(index,event.target.value,item.id)}/>
                                                    <Button className="my-btn my-btn-red my-btn-small"
                                                            icon="fa fa-close fa-lg"
                                                            onClick={this.props.deleteItem.bind(this,item.id,index)}/>
                                                </div>
                                            )}
                                    </div>

                                )
                            )}
                    </div>
                </ReactModal>

        );
    }

}

export default Modal;