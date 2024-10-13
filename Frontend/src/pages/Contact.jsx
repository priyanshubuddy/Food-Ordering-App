const Contact = () => {
  return (
    <div className="p-4">
      <div className='text-slate-600 font-bold text-lg max-w-md m-auto flex flex-col justify-center items-center h-auto bg-slate-200 rounded p-6'>
        <h1 className="text-2xl mb-4">Contact Us</h1>
        <p className='text-base text-slate-700 mb-4'>
          We'd love to hear from you! Whether you have a question about our menu, pricing, or anything else, our team is ready to answer all your questions.
        </p>
        <form className="w-full">
          <label className="block mb-2 text-sm font-medium text-slate-700" htmlFor="name">Name</label>
          <input className="w-full p-2 mb-4 border rounded" type="text" id="name" name="name" required />

          <label className="block mb-2 text-sm font-medium text-slate-700" htmlFor="email">Email</label>
          <input className="w-full p-2 mb-4 border rounded" type="email" id="email" name="email" required />

          <label className="block mb-2 text-sm font-medium text-slate-700" htmlFor="message">Message</label>
          <textarea className="w-full p-2 mb-4 border rounded" id="message" name="message" rows="4" required></textarea>

          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;