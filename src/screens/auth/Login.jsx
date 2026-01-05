import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail } from "../../store/action/AdminAction";
import { validateEmailHelper } from "../../helper/Emails";
import SpinnerCustom from "../../container/SpinnerCustom";
import { MdKeyboardArrowRight, MdVisibility, MdVisibilityOff, MdEmail, MdLock } from "react-icons/md";
import loginImg from "../../assets/images/loginImg.jpg";
import TypewriterComponent from "./TypewriterComponent";
import styles from "../../css/Login.module.css";

const cookies = new Cookies();

const Login = () => {
  // State variables for login form, errors, password visibility, and remember me checkbox
  const [loginForm, setLoginForm] = useState({
    email: localStorage.getItem("rememberemail") || "",
    passwordHash: localStorage.getItem("rememberpassword") || "",
  });
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, adminInfo } = useSelector((state) => state.adminLoginReducer);
  const navigate = useNavigate();

  // Preload images for better performance
  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };
    preloadImage(loginImg);
  }, []);

  // Note: Removed global Enter key handler - form submission handles this natively

  // Redirect based on user type after successful login
  useEffect(() => {
    if (cookies.get("ddAdminToken") && adminInfo?.data?.userType) {
      const userType = adminInfo.data.userType;
      const userRoutes = {
        "Super-Admin": "/adminDashboard",
        "Service-Engineer":"/service_eng_user_module",
        Production: "/productionModel",
        Support: "/Support_eng_dashboard",
        Nurse: "/nurse_module",
        Assistant: "/assiatant_dashboard",
        "Marketing-Admin":"/adminDashboard",
        //  "/marketing_head_screen",
        // User: "/service_eng",
        Accounts: "/accountDasboard",
        Dispatch: "/dispatchDashboardModule",
      };
      navigate(userRoutes[userType] || "/hospitalAdminScreen");
    }
  }, [navigate, adminInfo]);

  // Set password error if any during login
  useEffect(() => {
    if (error) {
      // Display server error appropriately
      if (error.toLowerCase().includes('email')) {
        setEmailError(error);
      } else if (error.toLowerCase().includes('password')) {
        setPasswordError(error);
      } else {
        // General error - show in password field as it's the last field
        setPasswordError(error);
      }
    }
  }, [error]);

  // Validate email function
  const validateEmail = (email) => {
    const isEmailValid = validateEmailHelper(email);
    if (isEmailValid.isSuccess) {
      setEmailError(null);
    } else {
      setEmailError(isEmailValid.message);
    }
    return isEmailValid.isSuccess;
  };

  // Validate password function
  const validatePassword = (passwordHash) => {
    if (!passwordHash) {
      setPasswordError("Please enter your password.");
      return false;
    }
    setPasswordError(null);
    return true;
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setLoginForm({ ...loginForm, email });
    // Clear email error when user starts typing
    if (emailError) {
      setEmailError(null);
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const passwordHash = e.target.value;
    setLoginForm({ ...loginForm, passwordHash });
    // Clear password error when user starts typing
    if (passwordError) {
      setPasswordError(null);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Clear previous errors
    setEmailError(null);
    setPasswordError(null);

    const emailValid = validateEmail(loginForm.email);
    const passwordValid = validatePassword(loginForm.passwordHash);

    if (emailValid && passwordValid) {
      // Handle remember me functionality before login
      if (isRememberMe) {
        localStorage.setItem("rememberemail", loginForm.email.toLowerCase());
        localStorage.setItem("rememberpassword", loginForm.passwordHash);
        localStorage.setItem("rememberMe", isRememberMe);
      } else {
        localStorage.removeItem("rememberemail");
        localStorage.removeItem("rememberpassword");
        localStorage.removeItem("rememberMe");
      }
      
      // Call login action with all required parameters
      const ddAdminToken = localStorage.getItem("ddAdminToken") || null;
      dispatch(loginWithEmail(loginForm.email, loginForm.passwordHash, isRememberMe, ddAdminToken));
    }
  };
  return (
    <div className={styles.loginContainer}>
      {/* Background overlay with gradient */}
      <div className={styles.backgroundOverlay}></div>
      
      {/* Left side: Clean background image */}
      <div className={styles.heroSection}>
        <img 
          src={loginImg} 
          alt="Building Background" 
          className={styles.heroImage}
          loading="eager"
        />
      </div>

      {/* Right side: Login form */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          {/* Header */}
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Welcome Back</h2>
            <TypewriterComponent/>
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {/* Email input */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <MdEmail className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                  onChange={handleEmailChange}
                  value={loginForm.email}
                  autoComplete="email"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
              </div>
              {emailError && <span className={styles.errorMessage}>{emailError}</span>}
            </div>

            {/* Password input */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <MdLock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                  onPaste={(e) => {
                    // This seems to be a debug/testing feature - consider removing in production
                    // setLoginForm({ ...loginForm, passwordHash: "aL8h%$498h5&29h" });
                  }}
                  onChange={handlePasswordChange}
                  value={loginForm.passwordHash}
                  autoComplete="current-password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
              {passwordError && <span className={styles.errorMessage}>{passwordError}</span>}
            </div>

            {/* Remember me checkbox */}
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={isRememberMe}
                  onChange={(e) => setIsRememberMe(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>Remember me</span>
              </label>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className={`${styles.loginButton} ${loading ? styles.loginButtonLoading : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <SpinnerCustom height="20px" color="white" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className={styles.formFooter}>
            <Link to="/forgetPassword" className={styles.footerLink}>
              <MdKeyboardArrowRight className={styles.footerLinkIcon} />
              Forgot your password?
            </Link>
            <Link to="/register" className={styles.footerLink}>
              <MdKeyboardArrowRight className={styles.footerLinkIcon} />
              Create an AgVa account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
