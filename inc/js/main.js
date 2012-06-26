function clearDomainInput(e) {
	  e.preventDefault();
      if (e.cleared) { return; }
      e.cleared = true;
      e.value = '';
      e.style.color = '#000';
    }
function formSubmit() {
	if($('#domain_input').val() != ''){
	$('#domain_input').prop('disabled', true); 
	$('button.check').prop('disabled', true);
	var btnStatus = $('button#status');
	var btnStatusSpan = $('button#status span');
	btnStatus.hide();
	$('#loading').fadeIn();

	$('.hidden').load('http://www.downforeveryoneorjustme.com/' + $('#domain_input').val() + ' #container', function(){
	$('#loading').hide();
	$('#domain_input').removeAttr('disabled');
	$('button.check').removeAttr('disabled');
	var str = $('.hidden').text();
	
	$('button#status').removeClass('btn-success').removeClass('btn-danger');
	if (str.indexOf("is up") >= 0){
			btnStatus.text('Site is UP').addClass('btn-success').fadeIn(500);
			btnStatusSpan.addClass('happy');
		} else {
			btnStatus.text('Site is DOWN').addClass('btn-danger').fadeIn(500);
			btnStatusSpan.addClass('sad');
		}
	});
} else {
		alert('Please specify a valid URL');
}
}
chrome.tabs.getSelected(null, function(tab) {
    setLink(tab.url);
});

function setLink(tablink) {
	if(tablink != 'chrome://newtab/'){
		tablink = tablink.toString().replace('https://','http://');
		$('#domain_input').val(tablink);
	}
}