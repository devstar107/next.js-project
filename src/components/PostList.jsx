import React from 'react';
import { toSvg } from 'jdenticon';

const PostList = ({ posts, remove, edit }) => {
  return (
    <>
      <div>
        <table className="min-w-full text-left ">
          <thead>
            <tr>
              <th scope="col" className="text-sm font-medium text-slate-400	 px-6 py-4">
                Name
              </th>
              <th scope="col" className="text-sm font-medium text-slate-400	 px-6 py-4">
                Company
              </th>
              <th scope="col" className="text-sm font-medium text-slate-400	 px-6 py-4">
                Email
              </th>
              <th scope="col" className="text-sm font-medium text-slate-400	 px-6 py-4">
                Admin
              </th>
              <th scope="col" className="text-sm font-medium text-slate-400	 px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          {posts.map((post, id) => (
            <>
              <tbody>
                <tr key={post.id} className="bg-white">
                  <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap items-center">
                    <div className='mr-2' dangerouslySetInnerHTML={{ __html: toSvg(Math.random(), 30) }} />
                    {post.firstname}
                    <p className="ml-1.5 ">{post.lastname} </p>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {post.company}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {post.email}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <img src={post.imageSrc} />
                  </td>
                  <td className="ml-8 pl-5">
                    <button onClick={() => edit(post.id)}>
                      <img src="https://i.ibb.co/S6nWVNv/Edit-1.png" />
                    </button>
                    <button onClick={() => remove(post)} className="ml-2">
                      <img src="https://i.ibb.co/C9J2V94/Trash-1.png" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      </div>
    </>
  );
};

export default PostList;
