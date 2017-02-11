var countryList = ['Cat','Stone','Girl with dog','Mobile','Surface','Dog','Bridge','Building','Cycle','Girl Pouting']

var imagelink = [
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg01.jpg",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg02.jpg",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg03.jpg",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg04.jpg",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg05.jpg",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg06.jpg",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg07.jpg",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg08.jpg",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg09.jpg",
	"https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/placeimg10.jpg"
]


function hidHomePageInputDiv() {

	if(document.getElementById('hoemPageInputBox').value.trim() == "") {
		return false;
	}


	document.getElementById("homePageInputDiv").style.display = 'none';
    document.getElementById("topDivision").style.display = 'block';
	var homePageInputvalue  = document.getElementById('hoemPageInputBox').value;
    document.getElementById("topInputBox").value = homePageInputvalue;
    document.getElementById('topInputBox').focus();

	var dataList = document.getElementById('countries');
	var input = document.getElementById('topInputBox');

    countryList.forEach(function(item) {
        var option = document.createElement('option');
        option.value = item;
        dataList.appendChild(option);
    });
}


function enterKey(ele) {
    if(event.keyCode == 13) {
        getImages();
    }
}


function getImages() {

	if(document.getElementById('topInputBox').value.trim() == "") {
		return false;
	}

	document.getElementById("activeImageLink").classList.add("active");
	document.getElementById("hiddenCategory").style.display = 'block';
	document.getElementById("imageGrid").style.display = 'block';

	appendImages();
}


function appendImages() {

	var getImageDiv  = document.getElementById('imageGrid'),docFrag=document.createDocumentFragment();
	var count = 1;
	imagelink.forEach(function(item) {
		var anchorTagDiv = document.createElement('div');
		$(anchorTagDiv).addClass('image-div');
		if(count%4===0){
			$(anchorTagDiv).addClass('row-last');
		}
		var anchorTag = document.createElement('a');
		anchorTag.href = "#image" + count;
		anchorTagDiv.appendChild(anchorTag);
		docFrag.appendChild(anchorTagDiv);
		var img = document.createElement("img");
	    img.src = item;
	    img.alt = "";
	    img.setAttribute('data-index',count);
		anchorTag.appendChild(img);

		count++;

	});
	getImageDiv.appendChild(docFrag);
}

function closeCollpase () {
	$("#collapsableImageDiv").hide();
	$('.spacer').removeClass('open');
}

function addSpacer (node,spacer) {

	$(spacer).insertAfter($(node));
}

$(document).ready(function() {
	var doc = document.createElement('div');
	var arrow = document.createElement('div');
	$(arrow).addClass('arrow');
	doc.append(arrow);
	$(doc).addClass('spacer').addClass('open');
	var imageParentDiv = document.querySelector('#imageGrid');

    imageParentDiv.addEventListener('click', function(e) {
			var collapsableImageDiv = $('#collapsableImageDiv');
    	if(e.target.getAttribute('data-index') == 1){
    		$('#leftChiveronButton').hide();
    	} else {
    		$('#leftChiveronButton').show();
    	}

    	if(e.target.getAttribute('data-index') == imagelink.length) {
    		$('#rightChiveronButton').hide();
    	} else {
    		$('#rightChiveronButton').show();
    	}

			if(e.target.tagName === 'IMG'){
				var pp = $(e.target).parents('div')[0],rowLast;
				if($(pp).hasClass('row-last')){
					rowLast = pp;
				} else{
					rowLast = $(pp).nextAll('.row-last')[0];
				}
				if(rowLast){
						addSpacer(rowLast,doc);
				} else {
					$('#imageGrid').append(doc);
				}
					var ppOffset = $(pp).offset();
					$('.arrow').css({left:ppOffset.left +  ($(pp).width()/2)});
				if(e.target.src == $('.smallImageTileRightBottom img').attr('src')) {

	    		collapsableImageDiv.slideToggle();
					$('.spacer').toggleClass('open');
		    } else {
					$('.spacer').addClass('open');
		    		var offset = $('.spacer').offset();
					var top = offset.top + "px";
					collapsableImageDiv.css({top:top});
					$('.collapseLargIamge img, .smallImageTileRightBottom img').attr('src',e.target.src);
					collapsableImageDiv.attr('data-current',$(e.target).data('index'));
					$(window).scrollTop(collapsableImageDiv.offset().top - $(pp).height());
		    collapsableImageDiv.show();
		    }
			}


    },true);
});


$(document).ready(function(){

    $("#rightChiveronButton").off('click').on('click',function() {

		var currentIndex =  $('#collapsableImageDiv').attr('data-current');
		var nextIndex = parseInt(currentIndex)+1;
		$('.image-div img[data-index='+nextIndex+']').trigger('click');

    });


    $("#leftChiveronButton").off('click').on('click',function() {
			var currentIndex =  $('#collapsableImageDiv').attr('data-current');
			var nextIndex = parseInt(currentIndex)-1;
			$('.image-div img[data-index='+nextIndex+']').trigger('click');	
    });
});
