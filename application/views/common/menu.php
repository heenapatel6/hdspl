<div class="container-fluid position-relative p-0">
    <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0" style="background-color: darkblue;">
        <div class="container-fluid"> <!-- Wrap the content in a container for better alignment -->
            <a href="" class="navbar-brand d-flex align-items-center">
                <h1 class="m-0"><i class="fa fa-wifi me-3"></i>HDSPL</h1>
                <div class="navbar-text text-white small ms-2" style="font-size: 25px;">
                    ( HiRo Digital Solution Private LTD ) <!-- Replace with your full project name -->
                </div>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="fa fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                <div class="navbar-nav">
                    <a href="<?php echo base_url(); ?>" class="nav-item nav-link <?php if ($this->uri->segment(1) == 'home' || $this->uri->segment(1) == '') echo 'active'; ?>">Home</a>
                    <a href="<?php echo base_url('about'); ?>" class="nav-item nav-link <?php if ($this->uri->segment(1) == 'about') echo 'active'; ?>">About</a>
                    <a href="<?php echo base_url('services'); ?>" class="nav-item nav-link <?php if ($this->uri->segment(1) == 'services') echo 'active'; ?>">Services</a>
                    <a href="<?php echo base_url('contact'); ?>" class="nav-item nav-link <?php if ($this->uri->segment(1) == 'contact') echo 'active'; ?>">Contact</a>
                </div>
            </div>
        </div>
    </nav>
</div>
