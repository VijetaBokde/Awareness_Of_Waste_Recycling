var imgData;
  var loading = document.getElementById("loading");
  var whatif = document.getElementById("what-if");
  var motivation = document.getElementById("motivation");
  var quotes = document.getElementById("quotes");
  var recyclingvideos = document.getElementById("recycling-videos");

  whatif.style.display = "none";
  motivation.style.display = "none";
  quotes.style.display = "none";
  recyclingvideos.style.display = "none";
  
  function previewImage(){
      
    var file = document.getElementById("file").files;
    if(file.length>0){
      var fileName = file[0].name;
      var allowed_extensions = new Array("jpeg", "jpg","png");
      var file_extension = fileName.split('.').pop().toLowerCase(); 

      if(allowed_extensions[0] == file_extension || allowed_extensions[1] == file_extension || allowed_extensions[2] == file_extension){
        var imgObj = document.getElementById("preview");
        var fileReader = new FileReader();

        fileReader.onload = function(event){
          document.getElementById("preview").setAttribute("src", event.target.result);
          imgData = event.target.result;
        };

        fileReader.readAsDataURL(file[0]);
      }
      else{
        document.getElementById("file").value = "";
        document.getElementById("errorTitle").innerHTML = "Error - Only Image File Acceptable";
        document.getElementById("errorMessage").innerHTML = "We only accept image with .jpeg .jpg or .png extensions.";
        $("#errorPopup").modal("show");

      }

      
    }
  }

  function classifyWaste(){
    var file = document.getElementById("file").files;
    if(file.length > 0){
      loading.style.display = "block";
      whatif.style.display = "block";
      motivation.style.display = "block";
      quotes.style.display = "block";
      recyclingvideos.style.display = "block";

      var form_data = new FormData();
      form_data.append("file", document.getElementById("file").files[0]);
      $.ajax({
        url: 'classifywaste', // point to server-side URL
        dataType: 'json', // what to expect back from server
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function (data) {
      
          var predicted_value = data["predicted_value"];
          var details = data["details"];
          var video1 = data["video1"];
          var video2 = data["video2"];

          var about = document.getElementById("about");
          var videotitle = document.getElementById("video-title");

          about.innerHTML = "<center><h3>Waste classified as <b style='background-color: #FF0000;'>" + predicted_value + "</b> material</h3></center><h4>"+ details +"</h4>";
          videotitle.innerHTML = "How "+ predicted_value +" Recycling Works?";

          document.getElementById("video1").setAttribute("src", "https://www.youtube.com/embed/" + video1);
          document.getElementById("video2").setAttribute("src", "https://www.youtube.com/embed/" + video2);

          loading.style.display = "none";
        }

      });
    }
    else{
      document.getElementById("errorTitle").innerHTML = "Error - Image not uploaded";
      document.getElementById("errorMessage").innerHTML = "Please upload image of your waste material.";
      $("#errorPopup").modal("show");
    }
  }
