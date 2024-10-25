import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../Context"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import Error from "./Error";
import Card from 'react-bootstrap/Card';
import * as Yup from 'yup';
import { QRCode } from "react-qrcode-logo";
import { BeatLoader } from "react-spinners";
import UseFetch from "../hooks/UseFetch";
import { createUrl } from "../../db/apiUrls";


const CreateLink = () => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const {user} = UrlState();
    const navigate = useNavigate();
    const ref = useRef();
    let [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        longUrl: Yup
           .string()
           .url("Must be a valid URL")
           .required("Long URL is required"),
        customUrl: Yup.string(),
    })

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    }

    const {
        loading, 
        error, 
        data, 
        fn: fnCreateUrl
       } = UseFetch(createUrl, {...formValues, user_id: user.id});

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`)
        }
    },[error, data]);


       const createNewLink = async () => {
        setErrors([]);
        try {
            await schema.validate(formValues, {abortEarly: false});
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
       }

  return (
    <div>
        <Button variant="primary" 
            onClick={handleShow}
            defaultOpen = {longLink}
            onOpenChange = {(res) => {
              if (!res) setSearchParams({});
            }}
        >
        Create New Link
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Create New</Modal.Title>
        </Modal.Header>
           {formValues?.longUrl && (
            <QRCode value={formValues?.longUrl} size={250} ref={ref}/>
           )}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                id="title"
                placeholder="Short Link's Title"
                value={formValues.title}
                onChange={handleChange}
              />
              {errors.title && <Error message={"some error"}/>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="longUrl"
                placeholder="Enter your Looooong URL"
                value={formValues.longUrl}
                onChange={handleChange}
              />
              {errors.longUrl && <Error message={"some error"}/>}
            </Form.Group>

            
            <Form.Group className="mb-3" >
            <div className="d-flex gap-3">
                <Card className="px-4 d-grid ">trimrr.in</Card> /
              <Form.Control
                id="customUrl"
                placeholder="Custom Link (optional)"
                value={formValues.customUrl}
                onChange={handleChange}
              />
              </div>
              {error && <Error message={error.message}/>}
            </Form.Group>
            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" 
              disabled={loading} 
              onClick={createNewLink}>
              {loading ? <BeatLoader size={10} color="white"/> : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default CreateLink