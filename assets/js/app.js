(function() {
  'use strict';
  var initialized=new WeakSet();
  var defaults= {
    whatsapp:'51982617971', appointmentUrl:'', promotion: {
      enabled:false,start:'',end:'',title:'',description:'',campaignCode:''
    }
  };
  function configuration() {
    var overrides=window.MGM_CONFIG|| {
    };
    return Object.assign( {
    },defaults,overrides, {
      promotion:Object.assign( {
      },defaults.promotion,overrides.promotion|| {
      })
    });
  }
  function limaToday() {
    var parts=new Intl.DateTimeFormat('en-CA', {
      timeZone:'America/Lima',year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(new Date());
    var v= {
    };
    parts.forEach(function(p) {
      v[p.type]=p.value;
    });
    return v.year+'-'+v.month+'-'+v.day;
  }
  function validDate(value) {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
    var date=new Date(value+'T12:00:00Z');
    return Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===value;
  }
  function activePromotion(config) {
    var p=config.promotion;
    var today=limaToday();
    return p.enabled===true&&validDate(p.start)&&validDate(p.end)&&p.start<=p.end&&today>=p.start&&today<=p.end&&typeof p.title==='string'&&p.title.trim()?p:null;
  }
  function whatsappUrl(config,message) {
    var number=String(config.whatsapp).replace(/\D/g,'');
    if(!/^\d{8,15}$/.test(number))number=defaults.whatsapp;
    return 'https://wa.me/'+number+'?text='+encodeURIComponent(message);
  }
  function dateLabel(value) {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return value;
    return new Intl.DateTimeFormat('es-PE', {
      timeZone:'America/Lima',day:'numeric',month:'long',year:'numeric'
    }).format(new Date(value+'T12:00:00-05:00'));
  }
  function focusReview(root,id) {
    root.querySelectorAll('[data-mgm-review]').forEach(function(panel) {
      panel.classList.toggle('is-selected',panel.id===id);
    });
    root.querySelectorAll('[data-mgm-review-link]').forEach(function(link) {
      var selected=link.dataset.mgmReviewLink===id;
      link.classList.toggle('is-selected',selected);
      if(selected)link.setAttribute('aria-current','true');
      else link.removeAttribute('aria-current');
    });
    var target=id?root.querySelector('[id="'+id.replace(/[^a-z0-9-]/gi,'')+'"]'):null;
    if(target) {
      target.scrollIntoView( {
        block:'start',behavior:'instant'
      });
      if(target.hasAttribute('tabindex'))target.focus( {
        preventScroll:true
      });
    }
  }
  function setup(root,query) {
    if(initialized.has(root))return;
    initialized.add(root);
    var config=configuration();
    var promo=activePromotion(config);
    root.querySelectorAll('[data-mgm-whatsapp]').forEach(function(link) {
      link.href=whatsappUrl(config,link.dataset.mgmWhatsapp||'Hola MGM, quisiera información sobre sus servicios.');
    });
    if(config.appointmentUrl) {
      var destination;
      try {
        destination=new URL(config.appointmentUrl,location.href);
        if(destination.protocol!=='https:'&&destination.protocol!=='http:')destination=null;
      }
      catch(e) {
        destination=null;
      }
      if(destination)root.querySelectorAll('[data-mgm-book]').forEach(function(link) {
        link.href=config.appointmentUrl;
      });
    }
    root.querySelectorAll('[data-mgm-promotion]').forEach(function(panel) {
      panel.hidden=!promo;
      if(!promo)return;
      panel.querySelector('[data-promo-title]').textContent=promo.title;
      panel.querySelector('[data-promo-description]').textContent=promo.description+' Vigencia: '+dateLabel(promo.start)+' al '+dateLabel(promo.end)+'.';
    });
    var button=root.querySelector('[data-mgm-menu]');
    var nav=root.querySelector('[data-mgm-mobile]');
    function closeMenu(restore) {
      if(!button||!nav)return;
      nav.hidden=true;
      button.setAttribute('aria-expanded','false');
      button.setAttribute('aria-label','Abrir menú');
      if(restore)button.focus();
    }
    if(button&&nav) {
      button.addEventListener('click',function() {
        var opening=nav.hidden;
        nav.hidden=!opening;
        button.setAttribute('aria-expanded',String(opening));
        button.setAttribute('aria-label',opening?'Cerrar menú':'Abrir menú');
      });
      nav.addEventListener('click',function(e) {
        if(e.target.closest('a[href]'))closeMenu(false);
      });
      root.addEventListener('keydown',function(e) {
        if(e.key==='Escape') {
          closeMenu(true);
          root.querySelectorAll('.m-nav-services[open]').forEach(function(d) {
            d.open=false;
            d.querySelector('summary').focus();
          });
        }
      });
    }
    root.addEventListener('click',function(e) {
      if(!e.target.closest('.m-nav-services'))root.querySelectorAll('.m-nav-services[open]').forEach(function(d) {
        d.open=false;
      });
    });
    root.querySelectorAll('[data-mgm-carousel]').forEach(function(carousel) {
      var tabs=Array.from(carousel.querySelectorAll('[data-mgm-slide-tab]'));
      var slides=Array.from(carousel.querySelectorAll('[data-mgm-slide]'));
      var track=carousel.querySelector('.m-service-track');
      var viewport=carousel.querySelector('.m-service-viewport');
      var keyboardControl=carousel.querySelector('[role="tablist"]')||viewport;
      var bars=Array.from(carousel.querySelectorAll('.m-carousel-progress span'));
      var current=0;
      function position() {
        track.style.transform='translateX(-'+(slides[current].offsetLeft-slides[0].offsetLeft)+'px)';
      }
      function show(index,moveFocus) {
        current=(index+slides.length)%slides.length;
        tabs.forEach(function(tab,i) {
          tab.setAttribute('aria-selected',String(i===current));
          tab.tabIndex=i===current?0:-1;
        });
        slides.forEach(function(slide,i) {
          slide.setAttribute('aria-hidden',String(i!==current));
          slide.inert=i!==current;
        });
        bars.forEach(function(bar,i) {
          bar.classList.toggle('is-active',i===current);
        });
        position();
        carousel.querySelector('[data-mgm-slide-status]').textContent=(carousel.dataset.mgmCarouselNoun||'Servicio')+' '+(current+1)+' de '+slides.length+': '+slides[current].querySelector('h3').textContent.trim();
        if(moveFocus)(tabs[current]||viewport).focus();
      }
      tabs.forEach(function(tab,i) {
        tab.addEventListener('click',function() {
          show(i,false);
        });
      });
      carousel.querySelector('[data-mgm-slide-prev]').addEventListener('click',function() {
        show(current-1,false);
      });
      carousel.querySelector('[data-mgm-slide-next]').addEventListener('click',function() {
        show(current+1,false);
      });
      keyboardControl.addEventListener('keydown',function(e) {
        if(!tabs.length&&e.target!==viewport)return;
        var next;
        if(e.key==='ArrowRight')next=current+1;
        else if(e.key==='ArrowLeft')next=current-1;
        else if(e.key==='Home')next=0;
        else if(e.key==='End')next=slides.length-1;
        else return;
        e.preventDefault();
        show(next,true);
      });
      var touchStart=null;
      viewport.addEventListener('touchstart',function(e) {
        if(e.touches.length===1)touchStart= {
          x:e.touches[0].clientX,y:e.touches[0].clientY
        };
      }, {
        passive:true
      });
      viewport.addEventListener('touchend',function(e) {
        if(!touchStart||!e.changedTouches.length)return;
        var dx=e.changedTouches[0].clientX-touchStart.x;
        var dy=e.changedTouches[0].clientY-touchStart.y;
        touchStart=null;
        if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4)show(current+(dx<0?1:-1),false);
      }, {
        passive:true
      });
      if(window.ResizeObserver) {
        new ResizeObserver(position).observe(carousel);
      }
      position();
    });
    root.querySelectorAll('[data-mgm-photo-carousel]').forEach(function(carousel) {
      var track=carousel.querySelector('[data-mgm-photo-track]');
      var slides=Array.from(carousel.querySelectorAll('[data-mgm-photo-slide]'));
      var dots=Array.from(carousel.querySelectorAll('[data-mgm-photo-dot]'));
      var current=0;
      var pendingIndex=null;
      function update(index) {
        current=index;
        dots.forEach(function(dot,i) {
          if(i===current)dot.setAttribute('aria-current','true');
          else dot.removeAttribute('aria-current');
        });
        carousel.querySelector('[data-mgm-photo-status]').textContent='Fotografía '+(current+1)+' de '+slides.length+': '+slides[current].querySelector('h3').textContent;
      }
      function show(index) {
        index=(index+slides.length)%slides.length;
        pendingIndex=index;
        update(index);
        track.scrollTo( {
          left:slides[index].offsetLeft-slides[0].offsetLeft,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'
        });
      }
      carousel.querySelector('[data-mgm-photo-prev]').addEventListener('click',function() {
        show(current-1);
      });
      carousel.querySelector('[data-mgm-photo-next]').addEventListener('click',function() {
        show(current+1);
      });
      dots.forEach(function(dot,i) {
        dot.addEventListener('click',function() {
          show(i);
        });
      });
      track.addEventListener('keydown',function(e) {
        var next;
        if(e.key==='ArrowRight')next=current+1;
        else if(e.key==='ArrowLeft')next=current-1;
        else if(e.key==='Home')next=0;
        else if(e.key==='End')next=slides.length-1;
        else return;
        e.preventDefault();
        show(next);
      });
      var scrollTimer;
      track.addEventListener('scroll',function() {
        clearTimeout(scrollTimer);
        scrollTimer=setTimeout(function() {
          if(pendingIndex!==null) {
            var destination=slides[pendingIndex].offsetLeft-slides[0].offsetLeft;
            if(Math.abs(track.scrollLeft-destination)>3)return;
            pendingIndex=null;
          }
          var nearest=0;
          var distance=Infinity;
          slides.forEach(function(slide,i) {
            var d=Math.abs(slide.offsetLeft-slides[0].offsetLeft-track.scrollLeft);
            if(d<distance) {
              distance=d;
              nearest=i;
            }
          });
          update(nearest);
        },150);
      }, {
        passive:true
      });
      function manualScroll() {
        pendingIndex=null;
      }
      track.addEventListener('touchstart',manualScroll, {
        passive:true
      });
      track.addEventListener('wheel',manualScroll, {
        passive:true
      });
    });
    root.querySelectorAll('[data-mgm-profile-open]').forEach(function(opener) {
      opener.addEventListener('click',function() {
        var id=opener.dataset.mgmProfileOpen;
        var dialog=root.querySelector('[data-mgm-profile-dialog="'+id+'"]');
        if(dialog)dialog.showModal();
      });
    });
    root.querySelectorAll('[data-mgm-profile-dialog]').forEach(function(dialog) {
      dialog.querySelector('[data-mgm-profile-close]').addEventListener('click',function() {
        dialog.close();
      });
      dialog.addEventListener('click',function(e) {
        if(e.target!==dialog)return;
        var box=dialog.getBoundingClientRect();
        if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)dialog.close();
      });
      dialog.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click',function() {
          dialog.close();
        });
      });
    });
    root.querySelectorAll('[data-mgm-team-toggle]').forEach(function(toggle) {
      toggle.addEventListener('click',function() {
        var card=toggle.closest('.m-team-card');
        var open=!card.classList.contains('is-open');
        card.classList.toggle('is-open',open);
        toggle.setAttribute('aria-expanded',String(open));
        if(!open)toggle.blur();
      });
      toggle.addEventListener('keydown',function(e) {
        if(e.key==='Escape') {
          toggle.closest('.m-team-card').classList.remove('is-open');
          toggle.setAttribute('aria-expanded','false');
          toggle.blur();
        }
      });
    });
    root.addEventListener('click',function(e) {
      var a=e.target.closest('.m-review-index a[href^="#"]');
      if(a&&!document.getElementById('mgm-preview-host')) {
        e.preventDefault();
        var href=a.getAttribute('href');
        if(location.hash===href)focusReview(root,href.slice(1));
        else location.hash=href;
      }
    });
    if(!document.getElementById('mgm-preview-host')&&root.querySelector('[data-mgm-review]')) {
      requestAnimationFrame(function() {
        focusReview(root,location.hash.slice(1));
      });
      window.addEventListener('hashchange',function() {
        if(root.isConnected)focusReview(root,location.hash.slice(1));
      });
    }
    root.querySelectorAll('input[type="date"]').forEach(function(input) {
      input.min=limaToday();
    });
    var params=new URLSearchParams(query!==undefined?query:location.search);
    root.querySelectorAll('select[name="service"]').forEach(function(select) {
      var value=params.get('servicio');
      if(value&&Array.from(select.options).some(function(o) {
        return o.value===value;
      }))select.value=value;
    });
    root.querySelectorAll('[data-mgm-request-form]').forEach(function(form) {
      var phoneInput=form.querySelector('input[name="phone"]');
      phoneInput.addEventListener('input',function() {
        phoneInput.setCustomValidity('');
      });
      function hideOldSummary() {
        form.querySelector('[data-mgm-result]').hidden=true;
      }
      form.addEventListener('input',hideOldSummary);
      form.addEventListener('change',hideOldSummary);
      form.addEventListener('submit',function(e) {
        e.preventDefault();
        form.querySelector('input[name="name"]').value=form.querySelector('input[name="name"]').value.trim();
        var digits=phoneInput.value.replace(/\D/g,'');
        phoneInput.setCustomValidity(digits.length>=7&&digits.length<=15&&!/[a-z]/i.test(phoneInput.value)?'':'Ingresa un número de teléfono válido.');
        if(!form.reportValidity())return;
        var data=new FormData(form);
        var selected=form.querySelector('select[name="service"]');
        var service=selected.options[selected.selectedIndex].textContent;
        var name=String(data.get('name')||'').trim();
        var company=String(data.get('company')||'').trim();
        var email=String(data.get('email')||'').trim();
        var phone=String(data.get('phone')||'').trim();
        var message=String(data.get('message')||'').trim();
        var date=String(data.get('preferred_date')||'');
        var period=String(data.get('period')||'');
        var lines=[form.dataset.mgmRequestForm==='appointment'?'Hola MGM, quisiera solicitar una asesoría.':'Hola MGM, quisiera realizar una consulta.','Nombre: '+name,'Servicio: '+service];
        if(company)lines.push('Empresa: '+company);
        if(phone)lines.push('Teléfono: '+phone);
        if(email)lines.push('Correo: '+email);
        if(date) {
          lines.push('Fecha preferida: '+dateLabel(date));
          lines.push('Turno preferido: '+period+' (hora de Lima)');
        }
        if(message)lines.push('Consulta: '+message);
        if(promo)lines.push('Campaña consultada: '+promo.title+(promo.campaignCode?' ['+promo.campaignCode+']':''));
        lines.push(date?'La fecha y el horario están sujetos a confirmación.':'Quedo atento a su respuesta.');
        var result=form.querySelector('[data-mgm-result]');
        result.hidden=false;
        result.querySelector('[data-mgm-summary]').textContent=lines.slice(1).join('\n');
        result.querySelector('[data-mgm-send]').href=whatsappUrl(config,lines.join('\n'));
        result.scrollIntoView( {
          behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'
        });
      });
    });
  }
  function initialize() {
    document.querySelectorAll('.mgm').forEach(function(root) {
      setup(root);
    });
  }
  window.MGM_UI= {
    initialize:initialize,setup:setup,focusReview:focusReview,activePromotion:activePromotion,limaToday:limaToday,whatsappUrl:whatsappUrl
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize);
  else initialize();
})();
