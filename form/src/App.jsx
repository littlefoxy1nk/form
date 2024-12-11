import React from 'react'
import { useState } from 'react'
import "./App.css"


// pour contenir les données saisie d'un utilisateur 
export default function App() {
  const [data, setdata] = useState({
    firstName: "",
    lastName:"",
    age:"",
    email:"",
    password:"",
    repeat:"",
  })

  // va mettre a jour le valeur 
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value 
     // set data et ce qui premet de modifier le data actuel par le nouveau
    setdata ( (prevdata)=>({ 
      ...prevdata, [name]: value
    })
      // ... spread opérator pour pour copier l'objet 
      // name : value car on va changer que ce qui a été changer ex firstName : Jean 
      // le spread va permettre de mettre a jour dans l'objet uniquement celui avec le nom choisit 

    )



  }
  // pour contenir les messages d'erreurs ( chaque champ aura le sien ) 
  const [errors, setErrors] = useState({});
  // creer la constance qui va vérifier que les champs sont valident 
  const validateFields = () => {
    const newErrors = {};
    
    if (!data.firstName || data.firstName.length < 3) {
      newErrors.firstName = 'Le prénom doit avoir au moins 3 caractères';
    }
    if (!data.lastName || data.lastName.length < 3) {
      newErrors.lastName = 'Le nom doit avoir au moins 3 caractères';
    }
    if (!data.age || isNaN(data.age) || data.age < 18) {
      newErrors.age = 'minimun 18 ans pour s inscrire ';
    }
    if (!data.email.includes('@')) {
      newErrors.email = 'Veuillez saisir une adresse e-mail valide';
    }

    if (data.password.length < 8) {
      newErrors.password = 'Le mot de passe doit comporter au moins 8 caractères';
    }
    if (data.password !== data.repeat) {
      newErrors.repeatPassword = 'Les mots de passe ne correspondent pas';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si pas d'erreur
  };

  const [submittedData, setSubmittedData] = useState(null);
  const [noForm, setNoForm] = useState(true);
// soumission du formulaire 
const handleSubmit = (e) => {
  e.preventDefault();
  if (validateFields()) { // si les champs on été verifier : retourne true si OK 
    setSubmittedData(data);
    setNoForm(false);// pour cacher le formulaire 
  }
};




  return (

    <div className="container">
      <div className="left-section">
        <h1>REGISTER</h1>
        <h2>DIFFERENT</h2>
        <footer>
        <h3>connect with yourself</h3>
        <p>be different with a style that only belongs to you.</p>    
        </footer>
      </div>




    <div className='right-section'>
      {noForm? (
    <form className='form'>
      <input type="text" name="firstName" placeholder="firstname" value={data.firstName} onChange={handleChange} className={errors.firstName ? 'input-error' : 'input-success'}  />
      {errors.firstName && <p className="error">{errors.firstName}</p>}
      <input type="text" name="lastName" placeholder="lastname" value={data.lastName} onChange={handleChange} className={errors.lastNameName ? 'input-error' : 'input-success'} />
      {errors.lastName && <p className="error">{errors.lastName}</p>}
      <input type="text" name="age" placeholder="age" value={data.age} onChange={handleChange} className={errors.age ? 'input-error' : 'input-success'} />
      {errors.age && <p className="error">{errors.age}</p>}
      <input type="text" name="email" placeholder="email" value={data.email} onChange={handleChange} className={errors.email ? 'input-error' : 'input-success'} />
      {errors.email && <p className="error">{errors.email}</p>}
      <input type="password" name="password" placeholder="password" value={data.password} onChange={handleChange} className={errors.password ? 'input-error' : 'input-success'} />
      {errors.password && <p className="error">{errors.password}</p>}
      <input type="password" name="repeat" placeholder="repeat" value={data.repeat} onChange={handleChange} className={errors.repeat ? 'input-error' : 'input-success'} />
      {errors.repeat && <p className="error">{errors.repeat}</p>}
      <button onClick={handleSubmit}>Submit </button>
    </form> ) : (

      <div className='your ID'>
        <h4>YOU ARE </h4>
        <ul>
          {Object.entries(submittedData).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
      </div>
      )}

    </div>
    </div>
  );
}


// class => className
//utilisation camelCase sauf ceux avec tiret 
//que 1 élément racine div fragement ou balise vide.