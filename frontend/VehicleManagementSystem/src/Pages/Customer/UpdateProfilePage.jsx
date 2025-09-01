import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from './../../redux/authSlice';

const API_BASE = "http://localhost:8080";

const UpdateProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [editingUser, setEditingUser] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userForm, setUserForm] = useState({ firstName: "", lastName: "", email: "", contactNo: "" });
  const [userError, setUserError] = useState("");

  const [licence, setLicence] = useState({ licenseNumber: "", expiryDate: "" });
  const [licencePreview, setLicencePreview] = useState(null);
  const [licenceFile, setLicenceFile] = useState(null);
  const [editingLicence, setEditingLicence] = useState(false);
  const [loadingLicence, setLoadingLicence] = useState(false);
  const [licenceError, setLicenceError] = useState("");
  const [hasLicence, setHasLicence] = useState(false);
  const [licenseId, setLicenseId] = useState(null);

  // const userId = localStorage.getItem("userId");
  const userId = useSelector((state) => state.auth.userId);


  // Redirect if no auth
  useEffect(() => {
    if (!token || !userId) {
      localStorage.clear();
      navigate("/login");
      return;
    }
    dispatch(loginSuccess(userId));
  }, [dispatch, token, userId, navigate]);

  // Sync auth user to local form state
  useEffect(() => {
    if (user) setUserForm(user);
  }, [user]);

  // Fetch licence from backend
  useEffect(() => {
    const fetchLicence = async () => {
      setLoadingLicence(true);
      setLicenceError("");
      try {
        const resp = await fetch(`${API_BASE}/customer/drivingLicense/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resp.status === 404) {
          setHasLicence(false);
          setLicence({ licenseNumber: "", expiryDate: "" });
          setLicencePreview(null);
          setLicenseId(null);
        } else if (!resp.ok) throw new Error("Failed to fetch license");
        else {
          const data = await resp.json();
          setLicence({ licenseNumber: data.licenseNumber ? String(data.licenseNumber) : "", expiryDate: data.expiryDate });
          setLicencePreview(data.licenseImage);
          setLicenseId(data.licenseId);
          setHasLicence(true);
        }
      } catch (e) {
        setLicenceError("Failed to load license");
      }
      setLoadingLicence(false);
    };
    fetchLicence();
  }, [token, userId]);

  // Handlers
  const handleUserChange = (e) => setUserForm({ ...userForm, [e.target.name]: e.target.value });

  const saveUser = async () => {
    setLoadingUser(true);
    setUserError("");
    try {
      await dispatch(loginSuccess({ userId, data: userForm })).unwrap();
      setEditingUser(false);
    } catch (e) {
      setUserError("Failed to save profile");
    }
    setLoadingUser(false);
  };

  const handleLicenceChange = (e) => {
    const { name, value } = e.target;
    if (name === "licenseNumber") setLicence({ ...licence, [name]: value.replace(/\D/g, "") });
    else setLicence({ ...licence, [name]: value });
  };

  const handleLicenceFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicenceFile(file);
      setLicencePreview(URL.createObjectURL(file));
    } else {
      setLicenceFile(null);
      setLicencePreview(null);
    }
  };

  const saveLicence = async () => {
    if (!token || !userId) return;
    setLoadingLicence(true);
    setLicenceError("");
    try {
      const formData = new FormData();
      formData.append("licenseNumber", licence.licenseNumber);
      formData.append("expiryDate", licence.expiryDate);
      formData.append("userId", userId);
      if (licenceFile) formData.append("imageFile", licenceFile);

      const resp = hasLicence
        ? await fetch(`${API_BASE}/customer/drivingLicense/${licenseId}`, { method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: formData })
        : await fetch(`${API_BASE}/customer/drivingLicense`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });

      if (!resp.ok) throw new Error("Failed to save license");

      const data = await resp.json();
      setLicence({ licenseNumber: data.licenseNumber ? String(data.licenseNumber) : "", expiryDate: data.expiryDate });
      setLicencePreview(data.licenseImage);
      setLicenseId(data.licenseId);
      setHasLicence(true);
      setEditingLicence(false);
      setLicenceFile(null);
    } catch (e) {
      setLicenceError("Failed to save license");
    }
    setLoadingLicence(false);
  };

  const btnStyle = { minWidth: "80px", marginLeft: "0.5rem", borderRadius: "5px", fontWeight: "bold", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" };

  return (
    <div className="container-fluid d-flex justify-content-center" style={{ background: "#f6fafd", minHeight: "100vh", padding: "2rem 0" }}>
      <div style={{ width: "100%", maxWidth: "550px" }}>
        {/* User Info */}
        <div className="card mb-4 shadow-sm" style={{ borderRadius: "12px", padding: "2rem" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4><i className="bi bi-person-circle me-2"></i>User Information</h4>
            {!editingUser ? (
              <button className="btn btn-primary" style={btnStyle} onClick={() => setEditingUser(true)}>Edit</button>
            ) : (
              <div>
                <button className="btn btn-success" style={btnStyle} onClick={saveUser} disabled={loadingUser}>Save</button>
                <button className="btn btn-danger" style={btnStyle} onClick={() => { setUserForm(user); setEditingUser(false); }} disabled={loadingUser}>Cancel</button>
              </div>
            )}
          </div>
          {userError && <div className="alert alert-danger py-1">{userError}</div>}
          {["firstName","lastName","email","contactNo"].map(field => (
            <div className="mb-2" key={field}>
              <label className="form-label fw-semibold">{field === "contactNo" ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input name={field} type={field==="email"?"email":field==="contactNo"?"tel":"text"} className="form-control" value={userForm[field]} onChange={handleUserChange} disabled={!editingUser || loadingUser} />
            </div>
          ))}
        </div>

        {/* License */}
        <div className="card shadow-sm" style={{ borderRadius: "12px", padding: "2rem" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4><i className="bi bi-card-text me-2"></i>Driving Licence</h4>
            {!editingLicence ? (
              <button className="btn btn-primary" style={btnStyle} onClick={() => setEditingLicence(true)}>Edit</button>
            ) : (
              <div>
                <button className="btn btn-success" style={btnStyle} onClick={saveLicence} disabled={loadingLicence}>Save</button>
                <button className="btn btn-danger" style={btnStyle} onClick={() => { setEditingLicence(false); setLicenceFile(null); setLicencePreview(hasLicence ? licencePreview : null); }} disabled={loadingLicence}>Cancel</button>
              </div>
            )}
          </div>
          {licenceError && <div className="alert alert-danger py-1">{licenceError}</div>}
          <div className="mb-2">
            <label className="form-label fw-semibold">Licence Image</label>
            <input type="file" accept="image/*" className="form-control" onChange={handleLicenceFile} disabled={!editingLicence || loadingLicence} />
            {licencePreview && <img src={licencePreview} alt="License Preview" className="img-fluid mt-2" style={{ maxHeight: "200px", objectFit: "contain" }} />}
          </div>
          <div className="mb-2">
            <label className="form-label fw-semibold">Licence Number</label>
            <input name="licenseNumber" type="text" className="form-control" value={licence.licenseNumber} onChange={handleLicenceChange} disabled={!editingLicence || loadingLicence} placeholder="Numeric only" />
          </div>
          <div className="mb-2">
            <label className="form-label fw-semibold">Expiry Date</label>
            <input name="expiryDate" type="date" className="form-control" value={licence.expiryDate} onChange={handleLicenceChange} disabled={!editingLicence || loadingLicence} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
