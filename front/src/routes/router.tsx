import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateEnquete from '../pages/CreateEnquete';
import DefaultLayout from '../layouts/Defaultlayout';
import Enquetes from '../pages/Enquetes'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
            </Route>

            <Route path="/criar" element={<DefaultLayout />}>
            <Route index element={<CreateEnquete />} />
            </Route>

            <Route path="/enquetes" element={<DefaultLayout />}>
            <Route index element={<Enquetes />} />
            </Route>

        </Routes>
    );
    }   

export default AppRoutes;