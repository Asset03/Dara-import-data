import { Form, Input, Switch, Button } from 'antd'
import axios from 'axios'
import { useRef, useState } from 'react'

function App() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [audio, setAudio] = useState(null)
  const [image, setImage] = useState(null)
  const [error, setError] = useState("Jok")
  const [success, setSuccess] = useState("")

  const imageRef = useRef(null)
  const audioRef = useRef(null)

  const defaultForm = {
    topic_id: 0,
    text: "",
    description: "",
    is_used: false,
    is_sentences: false,
    is_match: false,
    is_dialog: false,
  }

  const onSubmit = async (values) => {
    setLoading(true)
    const formData = new FormData()

    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    formData.append('audio', audio)
    formData.append('image', image)

    try {
      const response = await axios.post('http://134.122.3.135/word', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setError('Jok')
        setSuccess('Salyndy')
      }
      form.resetFields()
      resetFile()
    } catch (error) {
      console.error(error);
      setError('Salynbady dannyi deisngo koroche! uf uf uf')
      setSuccess('Salynbady')
    }
    setLoading(false)
  }

  const resetFile = () => {
    setAudio(null)
    setImage(null)
    imageRef.current.value = ""
    audioRef.current.value = ""
  }

  return (
    <div className="App">
      Error: {error}
      Success: {success}
      <Form form={form} onFinish={onSubmit} initialValues={defaultForm}>
        <Form.Item name="topic_id" label="topic_id">
          <Input value={form.topic_id} />
        </Form.Item>
        <Form.Item name="text" label="text">
          <Input value={form.text} />
        </Form.Item>
        <Form.Item name="description" label="description">
          <Input value={form.description} />
        </Form.Item>
        <Form.Item label="image">
          <input ref={imageRef} type='file' id="image" name="image" onChange={e => setImage(e.target.files[0])} />
        </Form.Item>
        <Form.Item label="audio">
          <input ref={audioRef} type='file' id="audio" name="audio" onChange={e => setAudio(e.target.files[0])} />
        </Form.Item>
        <Form.Item name="is_sentences" label='is_sentences'>
          <Switch value={form.is_sentences} />
        </Form.Item>
        <Form.Item name="is_dialog" label='is_dialog'>
          <Switch value={form.is_dialog} />
        </Form.Item>
        <Form.Item name="is_match" label='is_match'>
          <Switch value={form.is_match} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
