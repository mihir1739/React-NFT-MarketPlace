import {useState} from "react";

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import PreviewMint from "../components/ui/Preview-mint/PreviewMint";
import placeholder from "../assets/images/placeholder.jpg";
import Royalties from "../components/ui/Royalties/Royalties"
import {mintListener, readURL} from '../helper_functions/mint.js'

import "../styles/create-item.css";

const Create = (props) => {

  const {mainObject} = props;
  const creator = mainObject.accountId;

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [src, setSrc] = useState(placeholder);
  const [buffer, setBuffer] = useState(0);
  const [royalties, setRoyalties] = useState([]);

  const updateRoyalty = (object) =>{
    setRoyalties(royalties.map(item=>{
      if (item.listId === object.listId){
        return {
          listId: object.listId,
          account: object.account, 
          percentage: parseInt(object.percentage) * 100
        }
      }
      else{
        return item;
      }
    }))
  }

  const deleteRoyalty = (listId) =>{
    setRoyalties(
      royalties.filter(item =>{
        return item.listId !== listId
      })
    )
  }

  const addRoyalty = (listId) =>{
    setRoyalties([
      ...royalties,
      {
        listId,
        account:'',
        percentage:0
      }
    ])
  }

  const formHandler = (e) =>{
    e.preventDefault();
    
    const {wallet, nft_contract, accountId} = props.mainObject;

    const signedIn = wallet.isSignedIn();

    mintListener(title, desc, buffer, royalties, signedIn, nft_contract, accountId)
  }



  return (
    <>
      <CommonSection title="Create Item" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              <PreviewMint item={{title, desc, src, creator}} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form onSubmit={formHandler}>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input type="file" className="upload__input" onChange={(e)=>readURL(e, setSrc, setBuffer)} required/>
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="Enter title" onChange={(e)=> setTitle(e.target.value)} required/>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      onChange={ (e)=> setDesc(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="form__input">
                    <Royalties add={addRoyalty} update={updateRoyalty} delete={deleteRoyalty}/>
                  </div>
                  <button
                    className="bid__btn d-flex align-items-center gap-1"
                    type="submit"
                    >
                    <i className="ri-shopping-bag-line"></i> MINT NOW
                  </button>

                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Create;
