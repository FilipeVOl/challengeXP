import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateEnquete from '../pages/CreateEnquete';
import DefaultLayout from '../layouts/Defaultlayout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
            <Route index element={<CreateEnquete />} />
            </Route>
        </Routes>
    );
    }   

export default AppRoutes;