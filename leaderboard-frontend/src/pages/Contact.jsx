import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Form:');
    console.log('Nama:', nama);
    console.log('Email:', email);
    console.log('Pesan:', pesan);

    // Reset form jika perlu
    setNama('');
    setEmail('');
    setPesan('');

    alert('Pesan berhasil dikirim!');
  };

  return (
    <div className="page-container">
      <h1>Hubungi Kami</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          rows="4"
          placeholder="Pesan..."
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          required
        />
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}

export default Contact;
