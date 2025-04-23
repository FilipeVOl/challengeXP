import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateEnquete from '../pages/CreateEnquete';
import DefaultLayout from '../layouts/Defaultlayout';
import Enquetes from '../pages/Enquetes'
import EditEnquete from '../pages/EditEnquete';
import Results from '../components/Results';

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

            <Route path="/enquete/:id" element={<DefaultLayout />}>
            <Route index element={<EditEnquete />} />
            </Route>

            <Route path="/resultados/:id" element={<DefaultLayout />}>
            <Route index element={<Results />} />
            </Route>

        </Routes>
    );
    }   

export default AppRoutes;