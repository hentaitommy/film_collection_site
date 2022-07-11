import React, { useState } from 'react';
import { history } from 'umi';
import { useComment, deleteComment } from '@/utils/comment'
import { List, Input, Button } from 'antd'

export default function Index() {
  const [id, setID] = useState<number>()
  const [comments, error, refresh] = useComment(id)
  const onSearch = (v: string) => {
    setID(+v)
  }
  const logout = () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('currentUser')
    history.push('/login')
  }
  return (
    <div>
      你好，admin！
      <Button onClick={logout}>登出</Button>
      <Input.Search placeholder='输入需要管理评论的电影ID' onSearch={onSearch} />
      <List
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
            <Button onClick={()=>deleteComment(item.id)}>删除</Button>
          </List.Item>
        )}
      />
    </div>
  );
}
