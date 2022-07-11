import React from 'react';
import { Navigate } from 'umi'
import { Outlet } from 'umi';

export default () => {
	const isLogin = localStorage.getItem('token');
	if (!!isLogin) {
		return <Outlet></Outlet>;
	} else {
		return <Navigate to="/login" />
	}
}