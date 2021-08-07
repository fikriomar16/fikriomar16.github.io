var typed = new Typed(".typed", {
	strings : [" Backend Developer","IT Support","Programmer","Freelancer"],
	typeSpeed : 40,
	startDelay : 90,
	loop : true
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzV0HMGCuZqzZ_jD8CnbCL_Lhagpe5G_RPgJ_eYMKjjRa9GNI8pt4epOMovukfZz-oqmw/exec';
const form = document.forms['form'];

form.addEventListener('submit', e => {
	e.preventDefault();
	$('.btn-kirim').toggleClass('d-none');
	$('.btn-loading').toggleClass('d-none');
	fetch(scriptURL, { method: 'POST', body: new FormData(form)})
	.then(response => {
		$('.btn-kirim').toggleClass('d-none');
		$('.btn-loading').toggleClass('d-none');
		form.reset();
		$('#myalert').html('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
			'<strong>Terima Kasih!</strong> Pesan anda sudah terkirim.'+
			'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
			'</div>');
		console.log('Success!', response);
	})
	.catch(error => console.error('Error!', error.message))
});

window.addEventListener('DOMContentLoaded', event => {
	// Navbar shrink function
	var navbarShrink = function () {
		const navbarCollapsible = document.body.querySelector('#mainNav');
		if (!navbarCollapsible) {
			return;
		}
		if (window.scrollY === 0 || window.scrollY <= 666) {
			navbarCollapsible.classList.remove('navbar-shrink');
			navbarCollapsible.classList.remove('bg-light');
			navbarCollapsible.classList.remove('navbar-light');
			navbarCollapsible.classList.add('navbar-dark');
			$('meta[name=theme-color]').attr('content', '#262437');
		} else {
			navbarCollapsible.classList.add('navbar-shrink');
			navbarCollapsible.classList.add('bg-light');
			navbarCollapsible.classList.add('navbar-light');
			navbarCollapsible.classList.remove('navbar-dark');
			$('meta[name=theme-color]').attr('content', '#323458');
		}
	};
	// Shrink the navbar 
	navbarShrink();
	// Shrink the navbar when page is scrolled
	document.addEventListener('scroll', navbarShrink);
	// Add delay to activate scrollspy
	setTimeout(function () {
		// Activate Bootstrap scrollspy on the main nav element
		const mainNav = document.body.querySelector('#mainNav');
		if (mainNav) {
			new bootstrap.ScrollSpy(document.body, {
				target: '#mainNav',
				offset: 72
			});
		};
	},1600);
	// Collapse responsive navbar when toggler is visible
	const navbarToggler = document.body.querySelector('.navbar-toggler');
	const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarNav .nav-link'));
	responsiveNavItems.map(function (responsiveNavItem) {
		responsiveNavItem.addEventListener('click', () => {
			if (window.getComputedStyle(navbarToggler).display !== 'none') {
				navbarToggler.click();
			}
		});
	});
});
// Portofolio Data
$(document).ready(function() {
	// Prevent (#) in URL
	$(".nav-item a, .navbar-brand").on('click', function(event) {
		// Store hash
		var hash = this.hash;
		if (hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();
			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (Number) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				behavior: 'smooth',
				scrollTop: $(hash).offset().top
			}, 500, function(){
				// Add hash (#) to URL when done scrolling (default click behavior)
				// window.location.hash = hash;
			});
		}
	});
	setTimeout(function() {
		$('body').addClass('bg-custom');
	}, 500);
	setTimeout(function() {
		$('#fotoprofil').removeClass('d-none');
		$('body').removeClass('bg-purple');
	}, 1000);
	setTimeout(function() {
		$('#textprofil').removeClass('d-none');
		$('.navbar').removeClass('d-none');
		$('svg').removeClass('d-none');
	}, 1500);
	setTimeout(function() {
		portoku();
		$('#profil').removeClass('d-none');
		$('#pendidikan').removeClass('d-none');
		$('#pengalaman').removeClass('d-none');
		$('#keahlian').removeClass('d-none');
	}, 2000);
	setTimeout(function() {
		$('#portofolio').removeClass('d-none');
		$('#kontak').removeClass('d-none');
		$('footer').removeClass('d-none');
	}, 2500);
	function portoku() {
		var url = "porto.json";
		$.ajax({
			type: "GET",
			url: url,
			async: true,
			dataType: "json",
			success: function(data){
				var dp = data.portofolio;
				var temp = '';
				var i;
				for (i = 0; i < dp.length; i++) {
					temp+='<div class="col-lg-4 col-md-6 mb-4">'+
					'<div class="card bg-dark border-0 h-100 shadow-lg rounded">'+
					'<center><img src="'+dp[i].gambar+'" class="card-img-top img-responsive img-fluid"></center>'+
					'<div class="card-body bg-dark">'+
					'<h5 class="fw-bold text-info">'+dp[i].judul+'</h5>'+
					'<p>Project : <strong class="text-warning">'+dp[i].project+'</strong></p>'+
					'<p><em>'+dp[i].desc+'</em></p>'+
					'</div>'+
					'<div class="card-footer bg-dark">'+
					'<a class="d-flex text-light btn btn-danger justify-content-center" href="'+dp[i].link+'" target="_blank"><i class="bi-cursor-fill"></i>&nbsp;Menuju Project</a>'+
					'</div>'+
					'</div>'+
					'</div>';
				}
				$('#pf').html(temp);
			}
		});
	};
});