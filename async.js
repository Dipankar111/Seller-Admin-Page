async function saveToLocalStorage(event) {
  event.preventDefault();
  const sellingPrice = event.target.amount.value;
  const productName = event.target.product.value;
  const category = event.target.category.value;


  const obj = {
      sellingPrice,
      productName,
      category
  };

  try {
      const response = await axios.post("https://crudcrud.com/api/3cb79aa95d6c495d8404db925298a593/SellerPage", obj);
      showOnScreen(response.data);
  } catch (error) {
      console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
      const response = await axios.get("https://crudcrud.com/api/3cb79aa95d6c495d8404db925298a593/SellerPage");
      for (var i = 0; i < response.data.length; i++) {
          showOnScreen(response.data[i]);
      }
  } catch (error) {
      console.log(error);
  }
});

function showOnScreen(seller) {
  document.getElementById('amt').value = "";
  document.getElementById('prd').value = "";
  document.getElementById('category').value = "";
  if (localStorage.getItem(seller.productName) !== null) {
      removeUser(seller.productName);
      // editUser(seller.productName);
  }
  console.log(seller.category)


  if (seller.category === 'grocery') {

      let parentElement = document.getElementById("users");
      let childHTML = `<li id=${seller._id}style="padding-top: 7px;">${seller.sellingPrice} - ${seller.productName} - ${seller.category}
        <button onClick=deleteUser('${seller._id}','${seller.category}')>Delete User</button>
        <button onClick=editUser('${seller.sellingPrice}','${seller.productName}','${seller.category}','${seller._id}')>Edit User</button>
        </li>`;

      parentElement.innerHTML = parentElement.innerHTML + childHTML;
  }
  else if (seller.category === 'clothes') {
      let parentElement = document.getElementById("users-clothes");
      let childHTML = `<li id=${seller._id}style="padding-top: 7px;">${seller.sellingPrice} - ${seller.productName} - ${seller.category}
        <button onClick=deleteUser('${seller._id}','${seller.category}')>Delete User</button>
        <button onClick=editUser('${seller.sellingPrice}','${seller.productName}','${seller.category}','${seller._id}')>Edit User</button>
        </li>`;

      parentElement.innerHTML = parentElement.innerHTML + childHTML;
  }else if (seller.category === 'Electronics'){
      let parentElement = document.getElementById("elect-List");
      let childHTML = `<li id=${seller._id}style="padding-top: 7px;">${seller.sellingPrice} - ${seller.productName} - ${seller.category}
        <button onClick=deleteUser('${seller._id}','${seller.category}')>Delete User</button>
        <button onClick=editUser('${seller.sellingPrice}','${seller.productName}','${seller.category}','${seller._id}')>Edit User</button>
        </li>`;

      parentElement.innerHTML = parentElement.innerHTML + childHTML;
      
  }else if (seller.category === 'Miscellaneous'){
      let parentElement = document.getElementById("miscellaneous-List");
      let childHTML = `<li id=${seller._id}>${seller.sellingPrice} - ${seller.productName} - ${seller.category}
        <button onClick=deleteUser('${seller._id}','${seller.category}')>Delete User</button>
        <button onClick=editUser('${seller.sellingPrice}','${seller.productName}','${seller.category}','${seller._id}')>Edit User</button>
        </li>`;

      parentElement.innerHTML = parentElement.innerHTML + childHTML;
  }
}

async function deleteUser(sellerId, sellerCat) {
  try {
      await axios.delete(`https://crudcrud.com/api/3cb79aa95d6c495d8404db925298a593/SellerPage/${sellerId}`);
      removeUser(sellerId, sellerCat);
  } catch (error) {
      console.log(error);
  }
}

function editUser(amount, product, category, sellerId) {
  document.getElementById('amt').value = amount;
  document.getElementById('prd').value = product;
  document.getElementById('category').value = category;
  deleteUser(sellerId, category);
}

function removeUser(sellerId, sellerCat) {

  if(sellerCat === 'grocery'){
      let parentElement = document.getElementById("users");
      let childElementToBeDeleted = document.getElementById(sellerId);
      if (childElementToBeDeleted) {
          parentElement.removeChild(childElementToBeDeleted)
      }
  } else if(sellerCat === 'Electronics'){
      let parentElement = document.getElementById("elect-List");
      let childElementToBeDeleted = document.getElementById(sellerId);   
      if (childElementToBeDeleted) {
          parentElement.removeChild(childElementToBeDeleted)
      }
  }else if(sellerCat === 'clothes'){
      let parentElement = document.getElementById("users-clothes");
      let childElementToBeDeleted = document.getElementById(sellerId);
      if (childElementToBeDeleted) {
          parentElement.removeChild(childElementToBeDeleted)
      }
  } else{
      let parentElement = document.getElementById("miscellaneous-List");
      let childElementToBeDeleted = document.getElementById(sellerId);
      if (childElementToBeDeleted) {
          parentElement.removeChild(childElementToBeDeleted)
      }
  }
  
}











