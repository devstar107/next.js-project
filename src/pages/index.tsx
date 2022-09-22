import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { fakeUsers } from '../fakeData/fakeUsers';
import PostList from '../components/PostList';

export default Home;

function Home() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      firstname: 'Jane',
      lastname: 'Cooper',
      company: 'Apple',
      email: 'jessica.hanson@example.com',
      imageSrc: 'https://i.ibb.co/G0x1hH7/Indicator-2.png',
      password: 'hello',
    },
    {
      id: 2,
      firstname: 'Guy',
      lastname: 'Hawkins',
      company: 'IBM',
      email: 'bill.sanders@example.com',
      imageSrc: 'https://i.ibb.co/G0x1hH7/Indicator-2.png',
      password: 'hello',
    },
    {
      id: 3,
      firstname: 'Guy',
      lastname: 'Hawkins',
      company: 'IBM',
      email: 'bill.sanders@example.com',
      imageSrc: 'https://i.ibb.co/Zz8PFXw/Indicator-3.png',
      password: 'hello',
    },
  ]);

  const [post, setPost] = useState({
    firstname: '',
    lastname: '',
    company: '',
    email: '',
    password: '',
    imageSrc: 'https://i.ibb.co/Zz8PFXw/Indicator-3.png',
  });
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(true);

  const handleEdit = (id: any, post: any) => {
    setEdit(!edit);
    const editTodo: any = posts.find((i: any) => i.id === id);
    setPost(editTodo);
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleStatus = (e: any) => {
    e.preventDefault();
    setStatus(false);
    setPost({
      firstname: post.firstname,
      lastname: post.lastname,
      company: post.company,
      email: post.email,
      password: post.password,
      imageSrc: 'https://i.ibb.co/G0x1hH7/Indicator-2.png',
    });
  };

  const changeStatus = (e: any) => {
    e.preventDefault();
    setStatus(true);
    setPost({
      firstname: post.firstname,
      lastname: post.lastname,
      company: post.company,
      email: post.email,
      password: post.password,
      imageSrc: 'https://i.ibb.co/Zz8PFXw/Indicator-3.png',
    });
  };

  const addNewPost = (e: any) => {
    const newPost = {
      ...post,
      id: Date.now(),
    };
    setPosts([...posts, newPost]);
    setPost({ firstname: '', lastname: '', company: '', email: '', password: '', imageSrc: '' });
  };

  const removePost = (post: any, id: any) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    company: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });

  const { register, handleSubmit, watch, formState } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside className="sidebar w-80 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-white">
          <div className="sidebar-content px-4 py-6">
            <h1 className="font-bold text-2xl text-black-700 mb-6">Edit Customer</h1>
            <div className="mb-6">
              <form onSubmit={handleSubmit(addNewPost)}>
                <div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 mb-2 w-full group">
                      <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        {...register('firstname')}
                        value={post.firstname}
                        onChange={(e) => setPost({ ...post, firstname: e.target.value })}
                        className="bg-transparent	 border border-sky-500 text-slate-600	 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.firstname && <p className="text-red-500 text-sm mt-2">Required</p>}
                    </div>
                    <div className="relative z-0 mb-2 w-full group">
                      <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        {...register('lastname')}
                        value={post.lastname}
                        onChange={(e) => setPost({ ...post, lastname: e.target.value })}
                        className="bg-transparent	 border border-gray-300 text-slate-600	 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.lastname && <p className="text-red-500 text-sm mt-2">Required</p>}
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    {...register('company')}
                    value={post.company}
                    onChange={(e) => setPost({ ...post, company: e.target.value })}
                    className="bg-transparent	 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-2">Required</p>}
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                    Status
                  </label>
                  {status ? (
                    <div className="w-full bg-slate-100	h-full rounded-lg p-1 flex items-center">
                      <button
                        className="w-full bg-white	h-full rounded-lg p-2.5 text-center"
                        onClick={(e) => e.preventDefault()}
                      >
                        <p>User</p>
                      </button>
                      <button onClick={handleStatus} className="ml-5 w-full">
                        <p>Administrator</p>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full bg-slate-100	h-full rounded-lg p-1 flex items-center">
                      <button onClick={changeStatus} className="w-full	h-full  p-2.5 text-center">
                        <p>User</p>
                      </button>
                      <button
                        className=" ml-5 w-full bg-sky-500	h-full rounded-lg p-2.5 text-center"
                        onClick={(e) => e.preventDefault()}
                      >
                        <p>Administrator</p>
                      </button>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="eamil"
                    {...register('email')}
                    value={post.email}
                    onChange={(e) => setPost({ ...post, email: e.target.value })}
                    className="bg-transparent	 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2">Invalid Email</p>}
                </div>
                {!edit && (
                  <>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-slate-600	 dark:text-gray-300">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        {...register('password')}
                        value={post.password}
                        onChange={(e) => setPost({ ...post, password: e.target.value })}
                        className="bg-transparent	 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <div className=" absolute ml-60	-mt-8     ">
                        <img src="https://i.ibb.co/McrhStW/Eye.png" />
                      </div>
                      {errors.password ? (
                        <p className="text-red-500 text-sm mt-2">8+ characters</p>
                      ) : (
                        <div className="font-normal	text-slate-400	text-sm	 ">
                          <p> 8+ characters</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <button
                  type="submit"
                  className="mb-2 w-full inline-block px-6 py-2.5 bg-sky-500 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </aside>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in bg-white">
          <div className="main-content flex flex-col flex-grow p-6">
            <h1 className="font-bold text-2xl text-black-700">Customers</h1>
            <div className="flex flex-col flex-grow bg-white rounded mt-4">
              <div className="flex flex-col">
                <PostList remove={removePost} posts={posts} edit={handleEdit} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
