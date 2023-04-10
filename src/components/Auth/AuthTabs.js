//AuthTabs.js
import React, { useEffect, useContext } from 'react';
import { Tab, Tabs, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth, googleProvider } from '../../services/firebase/firebaseConfig';
import { saveUserData } from "../../services/firebase/firebaseUtils";
import { getAuth, signOut } from "firebase/auth";
import { AuthTabContext } from '../../contexts/AuthTabContext';
import { useNavigate } from 'react-router-dom';

const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
  }
};

export async function handleGoogleSignIn() {
  try {
    const user = await signInWithGoogle();
    if (user) {
      await saveUserData(user);
      // Realiza otras acciones después de guardar la información del usuario en Firestore.
    }
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
  }
}

export const handleSignOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

function AuthTabs() {
  const { activeTab, setActiveTab } = useContext(AuthTabContext);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(activeTab);
    navigate("/AuthTabs");
  }, [activeTab, setActiveTab, navigate]);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
    <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} id="auth-tabs">
      <Tab eventKey="login" title="Iniciar sesión">
        <Form style={{ padding: '24px' }}>
            <Form.Group controlId="loginEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su correo" />
            </Form.Group>

            <Form.Group controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingrese su contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ marginTop: '24px', marginBottom: '24px' }} >
              Iniciar sesión
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="register" title="Registrarse">
        <Form style={{ padding: '24px' }}>
            <Form.Group controlId="registerEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su correo" />
            </Form.Group>

            <Form.Group controlId="registerPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingrese su contraseña" />
            </Form.Group>

            <Form.Group controlId="registerPasswordConfirm">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control type="password" placeholder="Confirme su contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ marginTop: '24px', marginBottom: '24px' }} >
              Registrarse
            </Button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <p>Regístrate con tus redes sociales</p>
              <div>
                <Button variant="outline-primary" className="me-2" onClick={signInWithGoogle}>
                  <FontAwesomeIcon icon={faGoogle} /> <span style={{ paddingLeft: '10px' }}>Google</span>
                </Button>
              </div>
            </div>

          </Form>
        </Tab>
      </Tabs>
    </div>
  );
}

export default AuthTabs;
