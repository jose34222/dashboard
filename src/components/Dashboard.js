// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Grid 
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [postulacionesCount, setPostulacionesCount] = useState(0);
  const [practicasCount, setPracticasCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const studentsCollection = collection(db, 'Students');
      const companiesCollection = collection(db, 'Empresas');
      const postulacionesCollection = collection(db, 'Postulaciones');
      const practicasCollection = collection(db, 'Practicas');

      const studentsSnapshot = await getDocs(studentsCollection);
      const companiesSnapshot = await getDocs(companiesCollection);
      const postulacionesSnapshot = await getDocs(postulacionesCollection);
      const practicasSnapshot = await getDocs(practicasCollection);

      const studentsList = studentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const companiesList = companiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setStudents(studentsList);
      setCompanies(companiesList);
      setPostulacionesCount(postulacionesSnapshot.size);
      setPracticasCount(practicasSnapshot.size);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard de HELPU 
      </Typography>

      {/* Tabla de Estudiantes */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Typography variant="h6" gutterBottom style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
              Estudiantes
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Carrera</TableCell>
                  <TableCell>Ciudad</TableCell>
                  <TableCell>Fecha de Creación</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Nombre Completo</TableCell>
                  <TableCell>Género</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Provincia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.carrera || 'N/A'}</TableCell>
                    <TableCell>{student.ciudad || 'N/A'}</TableCell>
                    <TableCell>
                      {student.created_at && student.created_at.toDate
                        ? student.created_at.toDate().toLocaleString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{student.email || 'N/A'}</TableCell>
                    <TableCell>{student.full_name || 'N/A'}</TableCell>
                    <TableCell>{student.genero || 'N/A'}</TableCell>
                    <TableCell>{student.phone_no || 'N/A'}</TableCell>
                    <TableCell>{student.provincia || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Tabla de Empresas */}
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Typography variant="h6" gutterBottom style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
              Empresas
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de la Empresa</TableCell>
                  <TableCell>Dirección</TableCell>
                  <TableCell>Fecha de Creación</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>RUC</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((company, index) => (
                  <TableRow key={index}>
                    <TableCell>{company.company_name || 'N/A'}</TableCell>
                    <TableCell>{company.direccion || 'N/A'}</TableCell>
                    <TableCell>
                      {company.created_at && company.created_at.toDate
                        ? company.created_at.toDate().toLocaleString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{company.email || 'N/A'}</TableCell>
                    <TableCell>{company.phone_no || 'N/A'}</TableCell>
                    <TableCell>{company.ruc || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Contadores de Postulaciones y Prácticas */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '10px' }}>
        Cantidad de Postulaciones: {postulacionesCount}
      </Typography>
      <Typography variant="h6" gutterBottom style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
        Cantidad de Prácticas: {practicasCount}
      </Typography>
    </div>
  );
};

export default Dashboard;
