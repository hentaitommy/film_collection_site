import React, { useState } from 'react';
import { history } from 'umi';
import { useComment, deleteComment } from '@/utils/comment'
import { List, Input, Button } from 'antd'

export default function Index() {
  const [id, setID] = useState<number>()
  const [comments, error, refresh] = useComment(id)
  const [loading, setLoading] = useState(false)
  const onSearch = (v: string) => {
    setID(+v)
  }
  const logout = () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('currentUser')
    history.push('/login')
  }
  const onClick = async (id: number) => {
    setLoading(true)
    await deleteComment(id)
    await refresh()
    setLoading(false)
  }
  return (
    <div className='flex justify-center'>
      <div className='w-[800px]'>
        <div className='flex justify-between my-4'>
          <span>你好，admin！</span>
          <Button onClick={logout}>登出</Button>
        </div>
        <Input.Search placeholder='输入需要管理评论的电影ID' onSearch={onSearch} />
        <List
          loading={loading}
          dataSource={comments}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.content}
                description={<>
                  {`用户：${item.username}`}<br />
                  {`发布时间：${item.createdAt}`}<br />
                </>}
              />
              <Button onClick={() => onClick(item.id)}>删除</Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
